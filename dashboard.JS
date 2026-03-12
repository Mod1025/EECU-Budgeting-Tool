//Amount//
const randomAmount = () => {
    const min = 500;
    const max = 100000;

    const FinalAmount = Math.random()*(max - min) + min;
    const result = FinalAmount.toLocaleString('en-us');
    return result;
}

console.log(randomAmount());

const display = document.getElementById('randomAmount');
const m = randomAmount();
display.textContent = "$" + m;

// Summer Gap Savings //


const Savingsbar = () => {
    const max = 15000;

    const resultSavings = Math.random() * max;
    resultSavings.toLocaleString('en-US');
    const FinalSavings = (resultSavings / max ) * 100; 
    
    const three = FinalSavings.toFixed(0)
    return three;
}

console.log(Savingsbar());

const p = document.getElementById('savings');
const bar = document.getElementById('innerbar');

p.textContent = (`${resultSavings.toLocaleString('en-US')} saved of $15,000.00 goal`)

