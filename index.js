const express = require("express");
const mysql = require("mysql");
const inquirer = require("inquirer");
const path = require("path");
const PORT = process.env.PORT || 7500;

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
      message: "What would you like to do?",
      choices: [
        "Enter a Department?",
        "Enter a Role?",
        "Enter an Employee?"
         
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Enter a Department?":
          addDept();
          break;

        case "Enter a Role?":
          addRole();
          break;

        case "Enter an Employee?":
          addEmployee();
          break;

        case "View a Department?":
          viewDept();
          break;

        case "View a Role?":
          viewRole();
          break;

        case "View an Employee?":
          viewEmployee();
          break;

        case "Update a Manager?":
          updateManager();
          break;

        case "Update an Employee?":
          updateEmployee();
          break

        case "View utilized Department budget":
          budgetUsed();
          break;

        case "exit":
          connection.end();
          break;
      }
    });
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
  connection.query("Select * from departments"), function(err, res) {
  inquirer
    .prompt(
      {
        name: "title",
        type: "input",
        message: "Which Role would you like to add?"
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
      type: "input",
      message: "Under what Department does this Role fall?"
    })
    .then(function (answer) {
      var query = `Insert into department set ?`;
      connection.query(query, { name: answer.department, id: answer.id }, function (err, res) {
        if (err) {
          throw err
        } else if ;
        for (var i = 0; i < res.length; i++) {
          console.log("Name:  " + res[i].name + "id: " + res[i].id);
        }
        runTeamBldr();
      });
    });
};


function addEmployee() {
  inquirer
    .prompt(
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
      type: "input",
      message: "Under what Manager ID # does this Role fall?"
    })
    .then(function (answer) {
      var query = `Insert into department WHERE ?`;
      connection.query(query, {
        first_name: answer.employees, last_name: answer.employees,
        role_id: answer.employees, manager_id: answer.employees
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


function viewDepartment() {
  inquirer
    .prompt(
      {
        name: "id",
        type: "input",
        message: "Enter Department ID # you would like to view?"
      })
    .then(function (answer) {
      var query = `SELECT * FROM Department WHERE=?`;
      connection.query(query, {department_id: answer.employees}, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("First Name:  " + res[i].first_name + "Last Name: " + res[i].last_name
            + "Role ID: " + res[i].role_id + "Manager ID: " + res[i].manager_id);
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
        message: "What is the Role ID #?"
      })
    .then(function (answer) {
      var query = `Insert into department WHERE ?`;
      connection.query(query, {
        first_name: answer.employee, last_name: answer.employee,
        role_id: answer.employee, manager_id: answer.employee
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

function viewEmployee() {
  inquirer
    .prompt(
      {
        name: "last_name",
        type: "input",
        message: "What is your Employee's last name?"
      })
    .then(function (answer) {
        var query = `Insert into department WHERE ?`;
        connection.query(query, {
          first_name: answer.employee, last_name: answer.employee,
          role_id: answer.employee, manager_id: answer.employee
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

