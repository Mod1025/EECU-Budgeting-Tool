

const JobData = [];
const careerDrop = document.getElementById('careerDrop');
const Box1 = document.getElementById('income');
const addicon = document.getElementById('add-icon');
const MonthlyIncome = document.getElementById('MonthlyIncome');
const card4moneyr = document.getElementById('Remaining-money');
const Update = document.getElementById('Expenses-Table');

let myChart = null;
let MonthlyNetIncomeVariable = 0;

async function initializeBudgetApp() {

    loadBudgetData();
    
    try {
        const response = await fetch("https://eecu-data-server.vercel.app/data");
        if (response.ok) {
            const m = await response.json();
            m.forEach(Option => {
                const NewOption = document.createElement('option');
                NewOption.textContent = Option.Occupation;
                NewOption.value = Option.Salary;
                careerDrop.appendChild(NewOption);
            });

    
        } else {
            throw new Error("Check your data.")
        }
    } catch (error) {
        console.error(error);
    }

    loadBudgetData();
}

// Tax Deductions //
const calculateTaxes = (salary) => {
   const m = (salary) * 0.0145;
   const ss = (salary) * 0.062;
   const s = (salary) * 0.04;

   let fed = 0; 
   if (salary < 12400) {
    fed = salary * 0.10;
   } else if (salary < 50400) {
    fed = salary * 0.12;
   } else {
    fed = salary * 0.22;
   }

   const totalTaxes = m + ss + s + fed;
   const annualNet = salary - totalTaxes;
   MIncome(annualNet);
   

   document.getElementById("MNumTaxes").textContent = "-" + "$" + m.toLocaleString('en-US', {maximumFractionDigits:2});
   document.getElementById("SSNumTaxes").textContent = "-" + "$"+ ss.toLocaleString('en-US', {maximumFractionDigits:2});
   document.getElementById("SNumTaxes").textContent = "-" + "$" + s.toLocaleString('en-US', {maximumFractionDigits:2});
   document.getElementById("FNumTaxes").textContent = "-" + "$" + fed.toLocaleString('en-US', {maximumFractionDigits:2});
   document.getElementById("FinalNet").textContent = "Net Income: " + "$" + annualNet.toLocaleString('en-US', {maximumFractionDigits:2});
}


// Monthly expenses //
// Monthly Net Income 
const  MIncome = (annualNet) => {
   const F = (annualNet) / 12;
   MonthlyIncome.textContent = "Monthly Net Income: " + "$" + F.toLocaleString('en-US', {maximumFractionDigits:2});
   MonthlyNetIncomeVariable = F;
}

const scanner = (update) => {
   const E = document.getElementsByClassName('expense-input');
   let labels = [];
   let data = [];
   let TotalExpense = 0;
    for (let index = 0; index < E.length ;index++) {
       const val = Number(E[index].value) || 0;
       const name = E[index].closest('li').querySelector('label').textContent.replace(":", "").replace("$", "").trim();
        
        TotalExpense += val;
        labels.push(name);
        data.push(val);
    }

   const FinalUpdate = update - TotalExpense;

   const FinalDisplay = FinalUpdate < 0 ? 0 : FinalUpdate 
   MonthlyIncome.textContent = "Monthly Net Income: $" + FinalDisplay.toLocaleString('en-US', {maximumFractionDigits:2});
   card4moneyr.textContent = "$" + FinalDisplay.toLocaleString('en-US', {maximumFractionDigits:2});

   labels.push("Rmainig Balance")
   data.push(FinalDisplay > 0 ? FinalDisplay : 0);

   updateChart(labels, data);
} 

// Monthly Budget Breakdown //
// Chart box //
const updateChart = (labels, data) => {
    const ctx = document.getElementById('budgetChart').getContext('2d');

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#4e5d6c', '#001f3f', '#2b5ce7', '#4285f4', '#10938a', '#00a86b', '#2ecc71'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'right', 
                    labels: {
                        font: {
                            size: 13, family: 'roboto', weight: 'bold'
                        },
                        color: '#333'
                    }
                }
            }
        }
    });
}
// saves&LoadData //
const saveBudgetData = () => {
    const expenses = [];
    const expenseInputs = document.querySelectorAll('.expense-input');

    expenseInputs.forEach(input => {
        expenses.push({
            name: input.closest('li').querySelector('label').textContent.replace(":", "").trim(),
            value: input.value
        });
    });

    const dataToSave = {
        selectedSalary: careerDrop.value,
        customExpenses: expenses
    };

    localStorage.setItem('myBudgetData', JSON.stringify(dataToSave));
};

const loadBudgetData = () => {
    const savedData = localStorage.getItem('myBudgetData');
    if (!savedData) return;

    const parsedData = JSON.parse(savedData);

   
    if (parsedData.selectedSalary) {
        careerDrop.value = parsedData.selectedSalary;
        calculateTaxes(Number(careerDrop.value));
        document.getElementById('Salary').textContent = "$" + Number(careerDrop.value).toLocaleString('en-US');
    }
    if (parsedData.customExpenses) {
        parsedData.customExpenses.forEach(exp => {
        const existingLabels = Array.from(document.querySelectorAll('#Expenses-Table label'));
        const exists = existingLabels.some(l => l.textContent.includes(exp.name));

        if (!exists) {
            const li = document.createElement("li");
            const label = document.createElement("label");
            label.textContent = exp.name + ": ";
            const div = document.createElement("div");
            div.classList.add("right-row")
            const input = document.createElement("input");
            input.type = "number";
            input.placeholder = "$00.0"
            input.classList.add("expense-input");
            input.value = exp.value;
            const button = document.createElement("button");
            button.onclick = deleteExpense
            button.setAttribute('data-name', exp.name)
            button.textContent = "X";
            button.classList.add("Deletebtn");
            
            div.appendChild(input);
            div.appendChild(button);

            li.appendChild(label);
            li.appendChild(div);
            
            Update.appendChild(li);
        } else {
            const inputToUpdate = existingLabels.find(l => l.textContent.includes(exp.name)).nextElementSibling;
            inputToUpdate.value = exp.value;
        }
    });
    }
    

    scanner(MonthlyNetIncomeVariable);
};

//delete Function //

const deleteExpense = (event) => {
    const nameToDelete = event.target.getAttribute('data-name');
    const SavedData = localStorage.getItem('myBudgetData');
    const parsedData = JSON.parse(SavedData);
    parsedData.customExpenses = parsedData.customExpenses.filter(exp => exp.name !== nameToDelete)
    localStorage.setItem('myBudgetData', JSON.stringify(parsedData));
    location.reload();
}
// Event listeners //  
Update.addEventListener ("input", () => {
    scanner(MonthlyNetIncomeVariable);
    saveBudgetData();
});
addicon.addEventListener ("click", () => {
    const M = prompt ("What is the new category name?");

    if (!M) {
        alert(`Insert a category name please.`)
    
    } else if (M.length < 4) {
        alert(`It need to be more than 4 letter!`);
        
    }
        
    const li = document.createElement("li");
    const label = document.createElement("label");
    label.textContent = M + ": ";
    const div = document.createElement("div");
    div.classList.add("right-row")
    const input = document.createElement("input");
    input.type = "number";
    input.placeholder = "$00.0";
    input.step = "0.01";
    input.min = "0";
    input.classList.add("expense-input");
    const button = document.createElement("button");
    button.onclick = deleteExpense
    button.setAttribute('data-name', M)
    button.textContent = "X";
    button.classList.add("Deletebtn");

    li.appendChild(label);
    li.appendChild(div);

    div.appendChild(input);
    div.appendChild(button);

    

    document.getElementById('Expenses-Table').appendChild(li)

    scanner(MonthlyNetIncomeVariable);
    saveBudgetData();
});

careerDrop.addEventListener ("change", () => {
    const SelectedCareer = Number(careerDrop.value);
    calculateTaxes(SelectedCareer);
    const FormatNum = SelectedCareer.toLocaleString('en-US');
    const F = document.getElementById('Salary');
    F.textContent = "$" + FormatNum;

    scanner(MonthlyNetIncomeVariable);
    saveBudgetData();
});

updateChart(["Awaiting selection"], [100]);


initializeBudgetApp()


