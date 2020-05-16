const mysql =require("mysql");
require("dotenv").connection();
const inquirerJs =require("inquirer");
require("console.table");
const connection = require("./connection");
//Need to connect to mysql since we are using it.
connection.connect(function(err){
    if(err) throw err;
    // if there is no error then start prompting the user
    promptUser();
}
)

function promptUser(){
    inquirerJs.prompt(
        {
            type:"list",
            name:"task",
            message:"What would you like to do?",
            choices:["Would you like to add an employee?", 
            "Would you like to add a deparment?", 
            "Would you like to add a role?",
            "Would you like to view an employee?", 
            "Would you like to view a deparment?", 
            "Would you like to view a role?",
            "Would you like to delete an employee?", 
            "Would you like to delete a deparment?",
            "Would you like to delete a role?", 
            "Would you like to update an employee's role ID?",
            "Would you like to update an employee's manager ID?",
        "End"]
        }
    )

.then(function({task}){
//why are we using ({})?
//another example just used arrow notation .then(task=>{}
switch (task){
    case "Would you like to add an employee?":
    addEmployee();
    break;
    case "Would you like to add a deparment?":
    addDepartment();
    break;
    case "Would you like to add a role?":
    addRole();
    break;
    case "Would you like to view an employee?":
    viewEmployee();
    break;
    case "Would you like to view a deparment?":
    viewDepartment();
    break;
    case "Would you like to view a role?":
    viewRole();
    break;
    case "Would you like to delete an employee?":
    deleteEmployee();
    break;
    case "Would you like to delete a deparment?":
    deleteDepartment();
    break;
    case "Would you like to delete a role?":
    deleteRole();
    break;
    case "Would you like to update an employee's role ID?":
    updateRole();
    break;
    case "Would you like to update an employee's manager ID?":
    updateManagerId();
    break;
    case "Exit":
        connection.end();
}
})}

//Need to build out functions
function viewEmployee(){
    connection.query("select*from employee", function(err, data){
        console.table(data);
        promptUser();
    })
}
function viewDepartment(){
    connection.query("select*from department", function(err, data){
        console.table(data);
        promptUser();
    })
}
function viewRole(){
    connection.query("select*from role", function(err, data){
        console.table(data);
        promptUser();
    })
}
function addEmployee(){
        inquirerJs.prompt([
            {
                type:"input",
                name:"first_name",
                message:"What is the employee's first name?"
            },
            {
                input:"input",
                name:"last_name",
                message:"What is the employee's last name?"
            },
            {
                input:"number",
                name:"role_id",
                message:"What is the employee's role ID?"
            },
            {
                input:"number",
                name:"manager_id",
                message:"What is the employee's ID?"
            }]

        ).then(function(ans){
           connection.query("insert into employee (first_name,last_name, role_id, manager_id) values(?,?,?,?)",[ans.first_name,ans.last_name, ans.role_id, ans.manager_id], function(err,data){
               if (err) throw err;
               console.table(data)
               console.table("Successfully Inserted"),
               console.log("Successfully Inserted"),
               promptUser();
           })
    })
}
function addDepartment(){
    inquirerJs.prompt(
        {
            type:"input",
            name:"name",
            message:"What is the department's name?"
        },
    ).then(function(ans){
       connection.query("insert into department (name) values(?)",[ans.name], function(err,data){
           if (err) throw err;
           console.table(data)
           console.table("Successfully Inserted"),
           console.log("Successfully Inserted"),
           promptUser();
       })
})
}
function addRole(){
    inquirerJs.prompt([
        {
            type:"input",
            name:"title",
            message:"What is the title?"
        },
        {
            input:"number",
            name:"salary",
            message:"What is the salary of the role?"
        },
        {
            input:"number",
            name:"department_id",
            message:"What is the department's ID?"
        }]

    ).then(function(ans){
       connection.query("insert into role (title, salary, department_id) values(?,?,?)",[ans.title, ans.salary, ans.department_id], function(err,data){
           if (err) throw err;
           console.table(data)
           console.table("Successfully Inserted"),
           console.log("Successfully Inserted"),
           promptUser();
       })
})
}
function deleteEmployee(){
inquirerJs.prompt(
    {
        type:"input",
        name:"deleted_name",
        message:"What is the first name of the employee that you would like to remove?"
    }
).then(function(ans){
    connection.query('delete from employee (first_name) where value(?)', [ans.deleted_name], function(err, data){
        if (err) throw err;
        console.table(data)
        console.table("Successfully Inserted"),
        console.log("Successfully Inserted"),
        promptUser();

    }
    )}

)
}
function updateRole(){
    inquirerJs.prompt([
        {
            type:"input",
            name:"updated_role_first",
            message:"What is the first name of the employee that you would like to update their role?"
        },
        {
            type:"input",
            name:"updated_role_last",
            message:"What is the employee's last name?"
        },
        {
            type:"input",
            name:"new_role",
            message:"What is the employee's new role ID?"
        }
    ])
    .then(function(ans){
    connection.query("update employee set role_id=? where first_name=?",[ans.new_role,ans.updated_role_first], function(err,data){
    if(err) throw err;
    console.table(data)
    console.table("Successfully Inserted"),
    console.log("Successfully Inserted"),
    promptUser();
    })
        

        }
    )

}
function updateManagerId(){
    inquirerJs.prompt([
        {
            type:"input",
            name:"updated_role_first",
            message:"What is the first name of the employee that you would like to update their manager's ID?"
        },
        {
            type:"input",
            name:"updated_role_last",
            message:"What is the employee's last name?"
        },
        {
            type:"input",
            name:"new_manager",
            message:"What is the employee's manager's role ID?"
        }
    ])
    .then(function(ans){
    connection.query("update employee set manager_id=? where first_name=?",[ans.new_manager,ans.updated_role_first], function(err,data){
    if(err) throw err;
    console.table(data)
    console.table("Successfully Inserted"),
    console.log("Successfully Inserted"),
    promptUser();
    })
        

        }
    )

}