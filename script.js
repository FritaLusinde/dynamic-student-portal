// ---------- Part 1: Messages ----------
// console.log writes a secret note that only developers can see (F12 -> Console)
console.log("Hello from script.js! JavaScript is working.");

// alert pops up a message box. The "if" makes it appear only on the HOME page.
if (document.querySelector(".grid-container")) {
    alert("Welcome to the Dynamic Student Portal!");
}

// ---------- Part 2: Variables and if/else ----------
// A variable is a labelled box that holds something.
let studentName = "Amina";   // change this to your own name
let yearOfStudy = 2;

if (yearOfStudy === 1) {
    console.log(studentName + " is a first-year student. Welcome!");
} else if (yearOfStudy === 2) {
    console.log(studentName + " is a second-year student. Keep going!");
} else {
    console.log(studentName + " is a senior student. Almost there!");
}

// ---------- Part 3: A loop ----------
// A loop repeats a job. This one counts from 1 to 5.
for (let i = 1; i <= 5; i++) {
    console.log("Count: " + i);
}

// ---------- Part 4: Check the registration form ----------
const registrationForm = document.querySelector("form");

// This only runs on the page that HAS a form (register.html)
if (registrationForm) {
    registrationForm.addEventListener("submit", function (event) {
        const nameValue = document.getElementById("fullname").value.trim();

        if (nameValue === "") {
            event.preventDefault();   // STOP the form from being sent
            alert("Please enter your name before submitting.");
        }
    });
}
// ================= LAB 9: Objects, DOM and Fetch =================

// 1. Add ONE student (now an object, not just a name) to the page
function addStudentToPage(student) {
    const list = document.getElementById("student-list");
    const item = document.createElement("li");
    item.textContent = student.name + " - " + student.course + " (Year " + student.year + ")";
    list.appendChild(item);
}

// 2. Show ALL students and update the counter heading
function displayAllStudents(studentArray) {
    const list = document.getElementById("student-list");
    const heading = document.getElementById("student-heading");

    list.innerHTML = "";   // wipe first so nothing repeats

    for (let i = 0; i < studentArray.length; i++) {
        addStudentToPage(studentArray[i]);
    }

    heading.textContent = "Registered Students (" + studentArray.length + ")";
}

// 3. Fetch the data from students.json
async function loadStudents() {
    const list = document.getElementById("student-list");

    try {
        const response = await fetch("students.json");

        if (!response.ok) {
            throw new Error("Could not load students (status " + response.status + ")");
        }

        const data = await response.json();
        displayAllStudents(data);
    } catch (error) {
        console.error("Fetch failed:", error);
        list.innerHTML = "";
        const item = document.createElement("li");
        item.textContent = "Sorry, the student list could not be loaded.";
        item.style.color = "red";
        list.appendChild(item);
    }
}

// 4. Load when the button is clicked
const showButton = document.getElementById("show-students-btn");

if (showButton) {
    showButton.addEventListener("click", loadStudents);
}