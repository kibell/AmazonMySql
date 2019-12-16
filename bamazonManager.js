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
addInventory();
break;

case "Add new Product": 
addProduct();
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


let newitem_id;
function addInventory(){
 

    inquirer
      .prompt([
        {
        name: "item_id",
        type: "input",
        message: "What is the ID of the product you want to add inventory?",
        validate: function(num){
            if (isNaN(num)===false){
                return true;
            }

        },
        },
       
        


      ])

    
    .then(function(answer) {
        // const query = "SELECT * FROM products WHERE item_id = ?";
        
        connection.query("SELECT * FROM products WHERE ? ", { item_id: answer.item_id }, function(err, item) {[]
            let  table = new Table({
                head: ['Product Name',  'Department Name',  'Price', 'In Stock']
              
            });
             
            // table is an Array, so you can `push`, `unshift`, `splice` and friends
            table.push(
                [`${item[0].product_name}` , `${item[0].department_name}` , `${item[0].price}`, `${item[0].stock_quantity} `]
            
            );
           newitem_id = `${item[0].item_id}`
            console.log(table.toString())
          addStock();
          
             
           
          
        });
    });
}


function addStock(){

inquirer
.prompt([
  {
  name: "stock_quantity",
  type: "input",
  message: "How many are you adding?",
  validate: function(num){
      if (isNaN(num)===false){
          return true;
      }

  },
  },
 
  


])
.then(function(response) {
    connection.query("SELECT * FROM products WHERE ? ", { item_id: newitem_id }, function(err, item){
        
    let newInvo = parseInt(item[0].stock_quantity) + parseInt(response.stock_quantity)
    connection.query("Update products Set ?  WHERE ? ", [{ stock_quantity: newInvo},{item_id: newitem_id }], function(err, item) {[]
        if(err) throw err;
     console.log( "You have sucessfully added "+ response.stock_quantity +" item(s) to the inventory")

     }) 
  
  
 
});



});
}



function addProduct(){

    inquirer
    .prompt([
      {
      name: "product_name",
      type: "input",
      message: "What item do you want to add?",
    
    
      },
      {
        name: "department_name",
        type: "input",
        message: "Department?",
      
      
        },

        {
            name: "price",
            type: "input",
            message: "Price?",
          
          
            },
    
            {
                name: "stock_quantity",
                type: "input",
                message: "Quantity?",
              
              
                },
      
     
      
    
    
    ])
    .then(function(response) {
        
        connection.query("insert into products SET ?,?,?,?", [{ product_name: response.product_name},{ department_name: response.department_name}, { price: response.price},{ stock_quantity: response.stock_quantity}], function(err, item) {[]
            if(err) throw err;
         console.log( "You have sucessfully added "+ response.product_name +" to the Inventory")
    
         }) 
      
      
     
    });
    
    
    
    }
    