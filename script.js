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
// ================= LAB 8: Students list =================

// 1. An array is a numbered shelf of names
const students = ["Amina", "Brian", "Cynthia", "David", "Esther"];

// 2. A function that adds ONE name to the page
function addStudentToPage(name) {
    const list = document.getElementById("student-list");
    const item = document.createElement("li");   // make a new bullet
    item.textContent = name;                     // write the name on it
    list.appendChild(item);                      // stick it on the list
}

// 3. A function that adds ALL the names
function displayAllStudents(studentArray) {
    const list = document.getElementById("student-list");
    list.innerHTML = "";   // wipe the list first so names never repeat

    for (let i = 0; i < studentArray.length; i++) {
        addStudentToPage(studentArray[i]);
    }
}

// 4. Wait for the button to be clicked
const showButton = document.getElementById("show-students-btn");

if (showButton) {
    showButton.addEventListener("click", function () {
        displayAllStudents(students);
    });
}