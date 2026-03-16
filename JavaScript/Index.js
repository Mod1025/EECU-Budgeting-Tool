let Career = { Occupation: "", Salary: 0 };
const dropDown = document.getElementById("careerDrop");
const taxCard = document.getElementsByClassName("card");



async function getCareers() {
    const url = "https://eecu-data-server.vercel.app/data";
    try {
        const response = await fetch(url);
        const careers = await response.json();
        createOptions(careers); //see above
        return careers;
    }
    catch (error) {
        console.error("Error fetching careers data:", error);
        return [];
    }
    
}

function createOptions(careers) {
    careers.forEach(career => {
        const option = document.createElement("option");
        const occupation = career.Occupation;
        const salary = career.Salary;
        option.dataset.salary = salary; // Store the salary in a data attribute for later retrieval
        option.dataset.occupation = occupation; // Store the occupation in a custom property for later retrieval
        option.innerHTML = (`${occupation}: $${salary}`);
        dropDown.appendChild(option);
    });
}


function saveCareer() {
    localStorage.setItem("myBudgetData", JSON.stringify({ selectedSalary: Career.Salary }));
}

function loadCareer() {
    const savedCareer = localStorage.getItem("career");
    if (savedCareer) {
        myBudgetData = JSON.parse(savedCareer);
        console.log(`Future Career: ${Career.Occupation}`);
    }
}

function initalize() {
    loadCareer(); 
    getCareers(); 
    dropDown.addEventListener("change", () => {
        const selectedOption = dropDown.options[dropDown.selectedIndex];
        let occupation = selectedOption.dataset.occupation;
        let salary = Number(selectedOption.dataset.salary);
        Career.Occupation = occupation;
        Career.Salary= salary; 
        saveCareer();
    });
}





initalize();
