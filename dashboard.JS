//Amount//
const randomAmount = () => {
    const min = 500;
    const max = 2000;

    const FinalAmount = Math.random()*(max - min) + min;
    const result = FinalAmount.toLocaleString('en-US');
    return result;
}


const display = document.getElementById('randomAmount');
const m = randomAmount();
display.textContent = "$" + m;

// Summer Gap Savings //


const Savingsbar = () => {
    const max = 15000;
    const f = max.toLocaleString('en-US');

    const resultSavings = Math.random() * max;
    const r = resultSavings.toLocaleString('en-US');
    const StatusMessage = (`You have saved $${r} out of your $${f} goal!`)
    const p = document.getElementById('savings');
    p.textContent = StatusMessage
    const FinalSavings = (resultSavings / max ) * 100; 
    const three = FinalSavings.toFixed(0)
    return three;
}


const bar = document.getElementById('innerbar');
const f = Savingsbar ();
bar.style.width = f + "%";


// ---------------Recent Transactions---------------- //
// Price maker //
const Pricemaker = () => {
    const min = 10;
    const max = 100;

    const Step1 = Math.random() * (max - min ) + min;
    const Step2 = Step1 * -1;
    const Step3 = Step2.toFixed(2);

    return Step3;
    
}

// date maker //
const Datemaker = () => {
  const D = new Date (); 
  const M = Math.random() * 7;

  D.setDate(D.getDate () - M);
  const FinalDate = D.toLocaleDateString();

  return FinalDate;

}

// Id maker //
const Idmaker = () => {
    const M = Math.floor(Math.random() * 90000) + 10000;

    return M;
}

const RecentTransactions = () => {
    const w = ["Walmart", "Costco", "Target", "ALDI", "Starbucks", "Chipotle", "Dunkin", "Amazon", "SmartCuts", "shell"];

    

    
    const E = document.getElementById('Transaction');
    E.innerHTML = "";

    for (let i = 0; i < 4; i++) {
       const num = Math.floor(Math.random() * w.length) 
       const rnum = w[num]

       const FinalPrice = Pricemaker();
       const FinalDate = Datemaker(); 
       const FinalId = Idmaker();

       const row = document.createElement("div");
       row.classList.add("Transaction");

       const group1 = document.createElement("div");
       group1.classList.add("Name")

       const name = document.createElement("span");
       name.textContent = rnum + "#" + FinalId;
       name.classList.add("store-name");

       const date = document.createElement("p");
       date.textContent = FinalDate;
       date.classList.add("date");
       
       const price = document.createElement("span");
       price.textContent = FinalPrice;
       price.classList.add("price");

       
       group1.appendChild(name);
       group1.appendChild(date);
       
       row.appendChild(group1);
       row.appendChild(price);

       
       E.appendChild(row);
       
    } 
}

RecentTransactions();


