const JobData = [];
const careerDrop = document.getElementById('careerDrop');
const Box1 = document.getElementById('income');

async function initializeBudgetApp() {
    
    try {
        const response = await fetch("https://eecu-data-server.vercel.app/data");
        if (response.ok) {
            const m = await response.json();
            const careerDrop = document.getElementById('careerDrop');
            m.forEach( Option  => {
                const NewOption = document.createElement('option');
                NewOption.textContent = Option.Occupation;
                NewOption.value = Option.Salary;

                careerDrop.appendChild(NewOption);
            });
        } else {
            throw new Error("Check your data.")
        }
    } catch (error) {
        
    }   
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

   document.getElementById("MNumTaxes").textContent = "-" + "$" + m.toLocaleString('en-US');
   document.getElementById("SSNumTaxes").textContent = "-" + "$"+ ss.toLocaleString('en-US');
   document.getElementById("SNumTaxes").textContent = "-" + "$" + s.toLocaleString('en-US');
   document.getElementById("FNumTaxes").textContent = "-" + "$" + fed.toLocaleString('en-US');
   document.getElementById("FinalNet").textContent = "Net Income: " + "$" + annualNet.toLocaleString('en-US');
}


careerDrop.addEventListener ("change", () => {
    const SelectedCareer = Number(careerDrop.value);
    calculateTaxes(SelectedCareer);
    const FormatNum = SelectedCareer.toLocaleString('en-US');
    const F = document.getElementById('Salary');
    F.textContent = "$" + FormatNum;
    
});

initializeBudgetApp()
