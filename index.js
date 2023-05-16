const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const myTeam = [];

function makeManager() {
    const newManager = new Manager();
    inquirer
        .prompt([
            {
                type: "text",
                message: "What is the name of the Manager?",
                name: "name"
            },
            {
                type: "text",
                message: "What is the manager's ID?",
                name: "id"
            },
            {
                type: "text",
                message: "What is the manager's Email?",
                name: "email"
            },
            {
                type: "text",
                message: "What is the manager's office number?",
                name: "officeNumber"
            }
        ])
        .then((response) => {
            newManager.name = response.name;
            newManager.id = response.id;
            newManager.email = response.email;
            newManager.role = newManager.getRole();
            newManager.officeNumber = `Office Number: <span>${response.officeNumber}</span>`;
            myTeam.push(newManager);
            addTeamMember();
        })

}

function addTeamMember() {
    inquirer
        .prompt({
            type: "confirm",
            message: "Would you like to add a new Team Member?",
            name: "addMember"
        })
        .then((response) => {
            if (response.addMember) {
                makeEmployee();
            } else {
                console.log("Thank you, bye.")
                makeHtml(myTeam);
            }
        })
}

function makeEmployee() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Choose between an Intern or an Engineer:",
                name: "role",
                choices: ["Intern", "Engineer"]
            },
            {
                type: "text",
                message: "What is the name of the Employee?",
                name: "name"
            },
            {
                type: "text",
                message: "What is the Employee's ID?",
                name: "id"
            },
            {
                type: "text",
                message: "What is the Employee's Email?",
                name: "email"
            }
        ])
        .then((response) => {
            switch (response.role) {
                case "Intern":
                    makeIntern(response.name, response.id, response.email);
                    break
                case 'Engineer':
                    makeEngineer(response.name, response.id, response.email);
                    break
            }
        })
}



function makeEngineer(name, id, email) {
    let newEngineer = new Engineer(name, id, email);
    inquirer
        .prompt({
            type: "text",
            message: `Please enter ${newEngineer.name}'s gitHub User Name:`,
            name: "github"
        })
        .then((response) => {
            newEngineer.wildCard = `GitHub: <span><a href="https://github.com/${response.github}">${response.github}</a></span>`;
            myTeam.push(newEngineer);
            addTeamMember();
        })
}

function makeIntern(name, id, email) {
    const newIntern = new Intern(name, id, email);
    inquirer
        .prompt({
            type: "text",
            message: `What school does ${newIntern.name} attend?`,
            name: "school"
        })
        .then((response) => {
            newIntern.school = `School: <span>${response.school}</span>`;
            myTeam.push(newIntern);
            addTeamMember();
        })
}

function makeHtml(team) {
    const teamArray = team.map(member =>
        `<div class="teamMember card">
        <h2>${member.getRole()}</h2>
        <ul>
            <li>Name: <span> ${member.name}</span></li>
            <li>Id: <span> ${member.id}</span></li>
            <li>Email: <span> <a href=mailto:"${member.email}">${member.email}</a></span></li>
            <li> ${member.officeNumber}</li>
        </ul>
    </div>`
    )

    const HTMLwrapper =
        `<!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap"
                rel="stylesheet">
            <link rel="stylesheet" href="./style.css">
            <title>Team Members</title>
        </head>

        <body>
        <header>
            <h1>Team Members</h1>
        </header>
        <main>    
            <div id="cardContainer">
      ${teamArray.join("")}
        </div>
        </main>
        </body>

        </html>`;
    fs.writeFile('./dist/index.html', HTMLwrapper, (err) => (err) ? console.log("Couldn't write html file") : console.log("Success!! Wrote html file"));
    fs.writeFile('./dist/style.css', `:root {
        --orange: #C03221;
        --white: #F7F7FF;
        --tan: #F2D0A4;
        --grey: #545E75;
        --green: #3F826D;
        --text-shadow: 1px 1px 1px black;
    }
    
    body {
        font-family: 'Poppins', sans-serif;
        background-color: var(--white);
    }
    
    header {
        background-color: var(--green);
        height: 20vh;
    
    }
    
    h1 {
        text-align: center;
        color: var(--white);
        text-shadow: var(--text-shadow);
        font-size: 4em;
        margin-top: 0px;
    }
    
    h2 {
        text-align: center;
        color: var(--white);
        text-shadow: var(--text-shadow);
        font-weight: 400;
        text-decoration: underline;
    }
    
    ul {
        display: flex;
        flex-direction: column;
    
    }
    
    li {
        color: var(--white);
        text-shadow: var(--text-shadow);
        font-weight: 300;
        list-style-type: none;
    }
    
    span {
        font-weight: 200;
    }

    a {
        color: var(--tan);
    }
    
    #cardContainer {
        display: flex;
        flex-direction: inline;
        flex-wrap: wrap;
        justify-content: center;
    }
    
    .teamMember {
        background-color: var(--grey);
        border: 1px solid black;
        border-radius: 5px;
        box-shadow: 1px 1px 2px 1px black;
        margin: 10px;
        width: 25%;
    }
    
    @media screen and (max-width:1100px) {
        h1 {
            font-size: 3.5em;
        }
    
        li {
            font-size: 0.9em;
        }
    }
    
    @media screen and (max-width: 900px) {
        #cardContainer {
            flex-direction: column;
            align-items: center;
        }
    
        .teamMember {
            width: 60%;
        }
    }
    
    @media screen and (max-width: 545px) {
        .teamMember {
            width: 80%;
        }
    
        h1 {
            font-size: 2.8em;
        }
    }`, (err) => (err) ? console.log("Whoops, couldn't write the css file") : console.log('Success!! Wrote the css file"'));
}

makeManager();