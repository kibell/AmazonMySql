const mysql = require("mysql")
const inquirer = require("inquirer")
const Table = require('cli-table');
const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "@hokageKB1",
    database: "bamazon_db"


});





connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    
    Start()
    
    });


function Start(){
  console.log("Welcome To the Admin Portal, what is it you want to do?")

    inquirer
      .prompt([
        {
        name: "choice",
        type: "list",
        choices: ["View Products for Sale","View Low Inventory" , "Add to Inventory", "Add new Product"]
        

        },
        
        
       
        


      ])

      .then(function(answer) {

        switch(answer.choice){
case "View Products for Sale": 
viewProducts();
break;

case "View Low Inventory": 
lowInventory();
break;

case  "Add to Inventory": 
console.log("adde")
break;

case "Add new Product": 
console.log("new")
break;

        }

        
        
      }

    
      )
}



function viewProducts(){
    connection.query("select * from products", function(err, results) {
        if (err) throw err;
        console.log("Here is your current Items for Sale")
        // console.log('  Item_ID  |      Product Name      |  Department Name  |   Price  | In Stock');
        // console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ')

        for(let i = 0; i < results.length; i++){

           
            let itemID = results[i].item_id + ''; 
        
            let productName = results[i].product_name + ''; 
             
        
            let departmentName = results[i].department_name + ''; 
          
        
            let price = '$' + results[i].price + ''; 
            
        
            let quantity = results[i].stock_quantity + ''; // 
            // ----------------------------------------------
        
            // console.log(itemID + '|    ' + productName + '|     ' + departmentName + '|      ' + price + '|    ' + quantity);

           let  table = new Table({
                head: ['  Item_ID', 'Product Name',  'Department Name',  'Price', 'In Stock']
              
            });
             
            // table is an Array, so you can `push`, `unshift`, `splice` and friends
            table.push(
                [itemID, productName, departmentName, price, quantity]
            
            );
           
            console.log(table.toString())
          }
         

    });

}

function lowInventory(){
    connection.query("select * from products where stock_quantity <= '5' " , function(err, results) {
        if (err) throw err;
        console.log("You are running low on these items.")
        // console.log('  Item_ID  |      Product Name      |  Department Name  |   Price  | In Stock');
        // console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ')

        for(let i = 0; i < results.length; i++){

           
            let itemID = results[i].item_id + ''; 
        
            let productName = results[i].product_name + ''; 
             
        
            let departmentName = results[i].department_name + ''; 
          
        
            let price = '$' + results[i].price + ''; 
            
        
            let quantity = results[i].stock_quantity + ''; // 
            // ----------------------------------------------
        
            // console.log(itemID + '|    ' + productName + '|     ' + departmentName + '|      ' + price + '|    ' + quantity);

           let  table = new Table({
                head: ['  Item_ID', 'Product Name',  'Department Name',  'Price', 'In Stock']
              
            });
             
            // table is an Array, so you can `push`, `unshift`, `splice` and friends
            table.push(
                [itemID, productName, departmentName, price, quantity]
            
            );
           
            console.log(table.toString())
          }
         

    });

}