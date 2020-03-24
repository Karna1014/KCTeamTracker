const express = require("express");
const mysql = require("mysql");
const inquirer = require("inquirer");
const path = require("path");
const PORT = process.env.PORT || 7000;

const app = express();
// Sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "~KC70giresun",
  database: "teamTracker_db"
});

connection.connect((err) =>{
  if (err) {
  console.log(err);
  }
  console.log("connected as id " + connection.threadId);

 
  runTeamBldr();
});

function readEmployees() {
  
    connection.query("select * from employees", (err, data) => {
      if (err) {
        console.log(err);
      }
      console.table(data);
     })

  
};

function readDepartment() {
  connection.query("select * from department", (err, data) => {
    if (err) {
      console.log(err);
    }
    console.table(data);
  })
};

function readRole() {
  connection.query("select * from role", (err, data) => {
    if (err) {
      console.log(err);
    }
    console.table(data);
  })
};


function runTeamBldr() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      choices:[ 
        "View a Record",
        "Update a Record",
        "Enter a new Record",
        "View utilized Department budget",
        new inquirer.Separator(),
        "exit"
      ]

    }
    )
    .then(function (answer) {
       switch(answer.action) {
         case "View a Record":
           promptView();
           break;
       }

    })
}
function promptView() {
  inquirer
    .prompt(
    {
      name: "action",
      type: "list",
      message: "What would you like to View?",
      choices: [
        "View a Department",
        "View a Role",
        "View an Employee",
        new inquirer.Separator(),
        "Return to Main Menu"
      ]
    })
    .then(function (answer) {
      switch(answer.action) {
        case "View a Department":
          viewDept();
          break;

        case "View a Role":
          viewRole();
          break;

        case "View an Employee":
          viewEmployee();
          break;

        case "Return to Main Menu":
          runTeamBldr();
          break;

      }
    })
}
function promptUpdate() {
  inquirer
    .prompt(
    {
      name: "action",
      type: "list",
      message: "What would you like to View?",
      choices: [
        "Update a Department",
        "Update a Role",
        "Update an Employee",
        new inquirer.Separator(),
        "Return to Main Menu"
      ]
    })
    .then(function (answer) {
      switch(answer.action) {
        case "Update a Department":
          updateDept();
          break;

        case "View a Role":
          updateRole();
          break;

        case "View an Employee":
          updateEmployee();
          break;

        case "Return to Main Menu":
          runTeamBldr();
          break;

      }
    })
}

function addDept() {
  inquirer
    .prompt([
      {

        name: "name",
        type: "input",
        message: "Which Department would you like to add?"
      }, {
      name: "id",
      type: "input",
      message: "What is the department ID #?"
    }])
    .then(function (answer) {
      var query = `Insert into department set ?`;
      connection.query(query, { name: answer.name, id: answer.id }, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("Name:  " + res[i].name + "id: " + res[i].id);
        }
        runTeamBldr();
      });
    });
};




function addRole() {
  connection.query("Select * from department", function(err, res) {
     var adr = res;
    console.log(res);
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Which Role(Job Title) would you like to add?"
      }, {
      name: "id",
      type: "input",
      message: "What is the Role ID #?"
    }, {
      name: "salary",
      type: "input",
      message: "What is the starting salary of that Role?"
    }, {
      name: "department_id",
      type: "list",
      message: "Under what Department(ID#) does this Role fall?",
      choices: adr.map(department => {
        return {name: department.name, value: department.id}
      })
    }
  ])
    .then(function (answer) {
      var query = `Insert into department set ?`;
      connection.query(query, { name: answer.department, id: answer.id }, function (err, res) {
        if (err) throw err;
           for (var i = 0; i < res.length; i++) {
          console.log("Name:  " + res[i].name + "id: " + res[i].id);
        }
        runTeamBldr();
      });
    });
  })
};


function addEmployee() {
  connection.query("SELECT * FROM employees WHERE manager_id = 1007;", function(err, res) {
    var aem = res;
    console.log(res);
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is your Employee's first name?"
      }, {
      name: "last_name",
      type: "input",
      message: "What is your Employee's last name?"
    }, {
      name: "role_id",
      type: "input",
      message: "What is their Role's ID #?"
    }, {
      name: "manager_id",
      type: "list",
      message: "Who is the Reporting Manager?",
      choices: aem.map(employees => {
        return {name: employees.last_name, value: employees.id}
    })
  }
])
    .then(function (answer) {
      console.log(answer)
      var query = `Insert into employees set ?`;
      connection.query(query, {
        first_name: answer.first_name, last_name: answer.last_name,
        role_id: answer.role_id, manager_id: answer.manager_id
      }, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("First Name:  " + res[i].first_name + "Last Name: " + res[i].last_name
            + "Role ID: " + res[i].role_id + "Manager ID: " + res[i].manager_id);
          }
        
        // readEmployees().then(runTeamBldr)
   
        runTeamBldr();
      });
    });
  })
};


function viewDepartment() {
  inquirer
    .prompt(
      {
        name: "id",
        type: "input",
        message: "Enter Department Name you would like to view?"
      })
    .then(function (answer) {
      var query = `SELECT * FROM Department WHERE=?`;
      connection.query(query, {name: answer.name}, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("Department Name:  " + res[i].name + "Department ID: " + res[i].id);
        }
        runTeamBldr();
      });
    });
};
function viewRole() {
  inquirer
    .prompt(
      {
        name: "id",
        type: "input",
        message: "What is the Role(Job Title) you wish to view?"
      })
    .then(function (answer) {
      var query = `SELECT * from role WHERE=?`;
      connection.query(query, {
        title: answer.title
      }, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("Title:  " + res[i].title + "Salary: " + res[i].salary
            + "Role ID: " + res[i].id + "Department ID: " + res[i].department_id);
        }
        runTeamBldr();
      });
    });
};

function viewEmployee() {
  inquirer
    .prompt(
      {
        name: "last_name",
        type: "input",
        message: "What is your Employee's last name?"
      })
    .then(function (answer) {
        var query = `SELECT * from employees WHERE ?`;
        connection.query(query, {
          last_name: answer.last_name
      
        }, function (err, res) {
          if (err) throw err;
          for (var i = 0; i < res.length; i++) {
            console.log("First Name:  " + res[i].first_name + "Last Name: " + res[i].last_name
              + "Role ID: " + res[i].role_id + "Manager ID: " + res[i].manager_id);
          }
          runTeamBldr();
        });
      });
    };






app.listen(PORT, () => {
  // Log (server-side) when our server has started
  console.log(`Server listening on: http://localhost:${PORT}`);
});

