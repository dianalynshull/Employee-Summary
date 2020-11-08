const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const employees = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const managerQuestion = {
  type: "input",
  name: "officeNumber",
  message: "Please enter the office number of the manager: ",
};

const engineerQuestion = {
  type: "input",
  name: "github",
  message: "Please enter the github username of the engineer: ",
};

const internQuestion = {
  type: "input",
  name: "school",
  message: "Please enter the school that the intern attended: ",
};

const genericQuestions = [
  {
    type: "input",
    name: "name",
    message: "Please enter the name of the Employee: ",
  },
  {
    type: "input",
    name: "id",
    message: "Please enter the ID of the Employee: ",
  },
  {
    type: "input",
    name: "email",
    message: "Please enter the email address of the Employee: ",
  }
];

const newEmployeeOptions = {
  type: "list",
  name: "role",
  choices: [
    "Intern",
    "Engineer",
    "Done",
  ],
}

function managerQuestionFunction() {
  return inquirer.prompt(managerQuestion);
};

function engineerQuestionFunction() {
  console.log("Please answer the following questions about the engineer that you are adding to the team: ")
  return inquirer.prompt(engineerQuestion);
};

function internQuestionFunction() {
  console.log("Please answer the following questions about the intern that you are adding to the team: ")
  return inquirer.prompt(internQuestion);
};

function genericQuestionsFunction() {
  return inquirer.prompt(genericQuestions);
};

function addEmployee() {
  console.log("Would you like to add an employee to the manager's team? If not, please select 'Done'");
  return inquirer.prompt(newEmployeeOptions)
};

async function createManager() {
  try {
    const managerAnswers = await managerQuestionFunction();
    const genericManagerAnswers = await genericQuestionsFunction();
    const manager = new Manager(genericManagerAnswers.name, genericManagerAnswers.id, genericManagerAnswers.email, managerAnswers.officeNumber);

    employees.push(manager);
    console.log(employees);

    createEmployee();
  } catch(err) {
    console.log(err);
  }
}

async function createEmployee() {
  try {
    const employeeRole = await addEmployee();
    if (employeeRole.role === "Intern") {
      createIntern();
    } else if (employeeRole.role === "Engineer") {
      createEngineer();
    } else if (employeeRole.role === "Done") {
      console.log("All done!");
      return;
    }
  } catch(err) {
    console.log(err);
  }
}

async function createEngineer() {
  try {
    const engineerAnswers = await engineerQuestionFunction();
    const genericEngineerAnswers = await genericQuestionsFunction();
    const engineer = new Engineer(genericEngineerAnswers.name, genericEngineerAnswers.id, genericEngineerAnswers.email, engineerAnswers.github);

    employees.push(engineer);
    console.log(employees);

    createEmployee();
  } catch(err) {
    console.log(err);
  }
}
async function createIntern() {
  try {
    const internAnswers = await internQuestionFunction();
    const genericInternAnswers = await genericQuestionsFunction();
    const intern = new Intern(genericInternAnswers.name, genericInternAnswers.id, genericInternAnswers.email, internAnswers.school);

    employees.push(intern);
    console.log(employees);
    createEmployee();
  } catch(err) {
    console.log(err);
  }
}

async function init() {
  console.log("Welcome to the Team Profile Generator! We will start by adding the manager's information: ")
  createManager(); 
}

init();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

