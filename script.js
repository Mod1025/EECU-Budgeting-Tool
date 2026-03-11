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
    localStorage.setItem("career", JSON.stringify(Career));
}

function loadCareer() {
    const savedCareer = localStorage.getItem("career");
    if (savedCareer) {
        Career = JSON.parse(savedCareer);
        console.log(`Future Career: ${Career.Occupation}`);
    }
}

function initalize() {
    loadCareer(); // Load the saved career from localStorage
    getCareers(); // Fetch careers and populate the dropdown
    dropDown.addEventListener("change", () => {
        let occupation = dropDown.dataset.occupation;
        let salary = Number(dropDown.dataset.salary);
        dropDown.dataset.salary = salary; // Update the salary in the data attribute
        dropDown.dataset.occupation = occupation; // Update the occupation in the data attribute
        console.log(`Selected Career: ${occupation}, Salary: $${salary}`);
    }); //for when the user selects a dropdown option, it will update the Career object with the selected occupation and salary, and log the selected career and salary to the console.
}




initalize();
