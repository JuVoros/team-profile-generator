const Engineer = require('./lib/Engineer'); 
const Intern = require('./lib/Intern'); 
const Manager = require('./lib/Manager'); 
const fs = require('fs'); 
const path = require('path')
const inquirer = require('inquirer'); 

const OUT_DIRECTORY = path.resolve(__dirname, "build");
const outPut = path.join(OUT_DIRECTORY, "index.html");
const htmlRenderer = require("./util/generateHtml");

let team = [];

function mainMenu() {
    function createManager() {
        inquirer.prompt([
            {
                type: 'input',
                message: 'Enter manager name:',
                name: 'managerName'
            },
            {
                type: 'input',
                message: 'Enter manager ID:',
                name: 'managerId'
            },
            {
                type: 'input',
                message: 'Enter manager email:',
                name: 'managerEmail'
            },
            {
                type: 'input',
                message: "Enter manager office number:",
                name: 'managerOfficeNumber'
            },
        ]).then(function(data){
            const manager = new Manager(data.managerName, data.managerId, data.managerEmail, data.managerOfficeNumber);
            team.push(manager);
            teamOptions();
        })
    }

    function teamOptions() {
        inquirer.prompt([
            {
                type: "list",
                name: "teamChoice",
                message: "Which member would you like to add to the team?",
                choices: ["Intern","Engineer", "Build Team"]
            }
        ]).then(function(data){
            if(data.teamChoice === "Intern"){
                createIntern()
            }else if(data.teamChoice === "Engineer"){
                createEngineer();
            }else{
                buildTeam();
            }
        })
    }

    function createIntern() {
        inquirer.prompt([
            {
                type: 'input',
                message: 'Enter intern name:',
                name: 'internName'
            },
            {
                type: 'input',
                message: 'Enter intern ID:',
                name: 'internId'
            },
            {
                type: 'input',
                message: 'Enter intern email:',
                name: 'internEmail'
            },
            {
                type: 'input',
                message: "Enter intern school name:",
                name: 'internSchoolName'
            },
        ]).then(function(data){
            const intern = new Intern(data.internName, data.internId, data.internEmail, data.internSchoolName);
            team.push(intern);
            teamOptions();
        })
    }

    function createEngineer() {
        inquirer.prompt([
            {
                type: 'input',
                message: 'Enter engineer name:',
                name: 'engineerName'
            },
            {
                type: 'input',
                message: 'Enter engineer ID:',
                name: 'engineerId'
            },
            {
                type: 'input',
                message: 'Enter engineer email:',
                name: 'engineerEmail'
            },
            {
                type: 'input',
                message: "Enter engineer github:",
                name: 'engineerGithub'
            },
        ]).then(function(data){
            const engineer = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.engineerGithub);
            team.push(engineer);
            teamOptions();
        })
    }

    function buildTeam() {
        if (!fs.existsSync(OUT_DIRECTORY)) {
            fs.mkdirSync(OUT_DIRECTORY)
        }
        fs.writeFileSync(outPut, htmlRenderer(team), "utf-8");
    }

    createManager();
}
mainMenu();



