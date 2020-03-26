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

connection.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("connected as id " + connection.threadId);

  readRole();
  readEmployees();
  readDepartment();
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
      choices: [
        "View a Record",
        "Update a Record",
        "Enter a New Record",
        "Delete a Record",
        new inquirer.Separator(),
        "Exit"
      ]

    }
    )
    .then(function (answer) {
      switch (answer.action) {
        case "View a Record":
          promptView();
          break;

        case "Update a Record":
          promptUpdate();
          break;

        case "Enter a New Record":
          promptAdd();
          break;

        case "Delete a Record":
          promptDelete();
          break;
        
        case "Exit":
          exitTeam();
          break;
      }

    })
}

function promptAdd() {
  inquirer
    .prompt(
      {
        name: "action",
        type: "list",
        message: "What would you like to Add?",
        choices: [
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          new inquirer.Separator(),
          "Return to Main Menu"
        ]
      })
    .then(function (answer) {
      switch (answer.action) {
        case "Add a Department":
          addDept();
          break;

        case "Add a Role":
          addRole();
          break;

        case "Add an Employee":
          addEmployee();
          break;

        case "Return to Main Menu":
          runTeamBldr();
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
      switch (answer.action) {
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
        message: "What would you like to Update?",
        choices: [
          "Update an Employee Role",
          new inquirer.Separator(),
          "Return to Main Menu"
        ]
      })
    .then(function (answer) {
      switch (answer.action) {
        case "Update an Employee Role":
          updateEmpRole();
          break;

        case "Return to Main Menu":
          runTeamBldr();
          break;

      }
    })
}
function promptDelete() {
  inquirer
    .prompt(
      {
        name: "action",
        type: "list",
        message: "What would you like to Delete?",
        choices: [
          "Delete a Department",
          "Delete a Role",
          "Delete an Employee",
          new inquirer.Separator(),
          "Return to Main Menu",
          "Exit"
        ]
      })
    .then(function (answer) {
      switch (answer.action) {
        case "Delete a Department":
          delDept();
          break;

        case "Delete a Role":
          delRole();
          break;

        case "Delete an Employee":
          delEmployee();
          break;

        case "Return to Main Menu":
          runTeamBldr();
          break;

        case "Exit":
          exitTeam();
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
          console.log(`${answer.name} Department with ID ${answer.id} was successfully added!`);
        runTeamBldr();
      });
    });
};




function addRole() {
  connection.query("Select * from department", function (err, res) {
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
            return { name: department.name, value: department.id }
          })
        }
      ])
      .then(function (answer) {
        var query = `Insert into role set ?`;
        connection.query(query, { title: answer.title, id: answer.id, salary: answer.salary, department_id: answer.department_id }, function (err, res) {
          if (err) throw err;
            console.log(`${answer.title} with ID ${answer.id} was added to ${answer.department_id} with a 
            starting salary of $${answer.salary}.00`);
          
          runTeamBldr();
        });
      });
  })
};


function addEmployee() {
  // connection.query("SELECT * FROM employees WHERE manager_id = 1;", function (err, res) {
    // var aem = res;
    // console.log(res);
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
          type: "input",
          message: "Who is the Reporting Manager?"
          // choices: aem.map(employees => {
          //   return { name: employees.last_name, value: employees.id }
          
        }
      ])
      .then(function (answer) {
        query_obj = {};
        if (answer.manager_id == '') {
          query_obj = {first_name: answer.first_name, last_name: answer.last_name,
            role_id: answer.role_id}
        } else {
          query_obj = {first_name: answer.first_name, last_name: answer.last_name,
            role_id: answer.role_id, manager_id: answer.manager_id};
        }
        var query = `Insert into employees set ?`;
        connection.query(query, query_obj, function (err, res) {
          if (err) throw err;
            console.log(`${answer.first_name} ${answer.last_name} with Role ID # ${answer.role_id} has been 
            has been added under Manager ID ${answer.manager_id}`);

          // readEmployees().then(runTeamBldr)

          runTeamBldr();
        });
      });
 
};


function viewDept() {
  inquirer
    .prompt(
      {
        name: "name",
        type: "input",
        message: "Enter Department you would like to view?"
      })
    .then(function (answer) {
      var query = `SELECT * FROM department WHERE ?`;
      connection.query(query, { name: answer.name }, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("Department Name:  " + res[i].name + "\n" + "Department ID: " + res[i].id);
        }
        runTeamBldr();
      });
    });
};
function viewRole() {
  inquirer
    .prompt(
      {
        name: "title",
        type: "input",
        message: "What is the Role(Job Title) you wish to view?"
      })
    .then(function (answer) {
      var query = `SELECT * FROM role WHERE ?`;
      connection.query(query, { title: answer.title }, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("Title:  " + res[i].title + "\n" + "Salary: " + res[i].salary
            + "\n" + "Role ID: " + res[i].id + "\n" + "Department ID: " + res[i].department_id);
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
          console.table("First Name:  " + res[i].first_name + "\n" + "Last Name: " + res[i].last_name + "\n"
            + "Role ID: " + res[i].role_id + "\n" + "Manager ID: " + res[i].manager_id);
        }
        runTeamBldr();
      });
    });
};


function updateEmpRole() {
  inquirer
    .prompt([
      {
        name: "updateFN",
        type: "input",
        message: "What is the employees first name?",
      },
      {
        name: "updateLN",
        type: "input",
        message: "What is the employee's last name?" 
       },
       {
        name: "newRole",
        type: "input",
        message: "What is the new ID number?"
      } 
    ])
    .then(function (answer) {
      var query = `UPDATE employees SET ? WHERE ? AND ?`;
      connection.query(query, [{ role_id: answer.newRole }, { first_name: answer.updateFN }, { last_name: answer.updateLN }], function (err, res) {
        if (err) throw err;
        console.log(`${answer.updateFN } ${answer.updateLN} was successfully updated to ${answer.newRole}!`);
        runTeamBldr();
      });
    });
  };
function delDept() {
  connection.query("Select * from department", function (err, res) {
    if(err) throw err;
    var adr = res;
    console.table(res);
    inquirer
      .prompt(
          {
          name: "department_id",
          type: "list",
          message: "Which Department do you wish to Delete?",
          choices: adr.map(department => {
            return { name: department.name }
          })
        }
      )
      .then(function (answer) {
        var query = `DELETE FROM department WHERE ?`;
        connection.query(query, {name: answer.department_id}, function (err, res) {
          if (err) throw err;
            console.log(`${res.affectedRows} Department with ID: ${answer.department_id}was deleted from your list!\n`);
          
          runTeamBldr();
        });
      });
  })
};
function delRole() {
  connection.query("Select * from role", function (err, res) {
    if(err) throw err;
    console.table(res);
    const roleChoices = res.map(({ id, title }) => ({
      title: title,
      value: id
    }));
    inquirer
      .prompt(
          {
          name: "roleId",
          type: "list",
          message: "Which Role do you wish to Delete?",
          choices: roleChoices
        }
      )
      .then(answer => {
        var query = `DELETE FROM role WHERE ?`;
          connection.query(query, { id: answer.roleId }, function (err, res) {
          if (err) throw err;
            console.log(`${res.affectedRows} role with ID: ${answer.roleId} was deleted from your list!\n`);
          
          runTeamBldr();
        });
    });
  })
};

  
function delEmployee() {
  connection.query("Select * from employees", function (err, res) {
    if(err) throw err;
    console.table(res);
    const empChoices = res.map(({ id, last_name }) => 
    ({name: last_name, value: id})); 
    
    inquirer
      .prompt(
          {
          name: "empId",
          type: "list",
          message: "Which Employee do you wish to Delete?",
          choices: empChoices
        }
      )
      .then(answer => {
        var query = `DELETE FROM employees WHERE ?`;
          connection.query(query, { id: answer.empId }, function (err, res) {
          if (err) throw err;
            console.log(`${res.affectedRows} Employee with ID: ${answer.empId} was deleted from your roster!\n`);
          
          runTeamBldr();
        });
    });
  }) 
};

function exitTeam() {
    console.log("Thank you for keeping your records accurate!")
    connection.end();
  };

  // function delRole() {
  //   connection.query("Select * from role", function (err, res) {
  //     var adt = res;
  //     console.table(res);
  //     inquirer
  //       .prompt(
  //          {
  //           name: "d-role",
  //           type: "list",
  //           message: "Which Role do you wish to Delete?",
  //           choices: adt.map(role => {
  //             return { name: role.title }
  //           })
  //         }
  //       )
  //       .then(function (answer) {
  //         var query = `DELETE FROM role WHERE ?`;
  //         connection.query(query, {name: answer.d-role}, function (err, res) {
  //           if (err) throw err;
  //             console.log(`Role: ${res.affectedRows} was deleted from your list!\n`);
            
  //           runTeamBldr();
  //         });
  //       });
  //   })
  // };



 
  


  app.listen(PORT, () => {
    // Log (server-side) when our server has started
    console.log(`Server listening on: http://localhost:${PORT}`);
  });

