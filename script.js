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

// ---------- Part 4: Check the registration form with regex ----------

// Pattern 1: name can only have letters and spaces
const namePattern = /^[A-Za-z ]+$/;

// Pattern 2: email must look like something@something.something
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const registrationForm = document.querySelector("form");

// This only runs on the page that HAS a form (register.html)
if (registrationForm) {
    registrationForm.addEventListener("submit", function (event) {
        const nameValue = document.getElementById("fullname").value.trim();
        const emailValue = document.getElementById("email").value.trim();

        if (nameValue === "") {
            event.preventDefault();
            alert("Error: Please enter your name.");
        } else if (!namePattern.test(nameValue)) {
            event.preventDefault();
            alert("Error: Your name can only contain letters and spaces.");
        } else if (!emailPattern.test(emailValue)) {
            event.preventDefault();
            alert("Error: Please enter a valid email, like name@example.com.");
        } else {
            alert("Success! Your registration looks good.");
        }
    });
}
// ================= LAB 10: Student class =================

// The cookie cutter
class Student {
    constructor(name, email, course, year) {
        this.name = name;
        this.email = email;
        this.course = course;
        this.year = year;
    }

    // A method is something every student can DO
    getSummary() {
        return this.name + " - " + this.course + " (Year " + this.year + ") - " + this.email;
    }
}

// Add ONE student to the page
function addStudentToPage(student) {
    const list = document.getElementById("student-list");
    const item = document.createElement("li");
    item.textContent = student.getSummary();
    list.appendChild(item);
}

// Show ALL students and update the counter heading
function displayAllStudents(studentArray) {
    const list = document.getElementById("student-list");
    const heading = document.getElementById("student-heading");

    list.innerHTML = "";

    for (let i = 0; i < studentArray.length; i++) {
        addStudentToPage(studentArray[i]);
    }

    heading.textContent = "Registered Students (" + studentArray.length + ")";
}

// Fetch the data and stamp out Student objects
async function loadStudents() {
    const list = document.getElementById("student-list");

    try {
        const response = await fetch("students.json");

        if (!response.ok) {
            throw new Error("Could not load students (status " + response.status + ")");
        }

        const data = await response.json();

        // Turn each plain card into a real Student
        const studentObjects = data.map(function (s) {
            return new Student(s.name, s.email, s.course, s.year);
        });

        displayAllStudents(studentObjects);
    } catch (error) {
        console.error("Fetch failed:", error);
        list.innerHTML = "";
        const item = document.createElement("li");
        item.textContent = "Sorry, the student list could not be loaded.";
        item.style.color = "red";
        list.appendChild(item);
    }
}

// Load when the button is clicked
const showButton = document.getElementById("show-students-btn");

if (showButton) {
    showButton.addEventListener("click", loadStudents);
}