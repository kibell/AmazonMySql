const mysql = require("mysql")
const inquirer = require("inquirer")

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

showTable()

});


function showTable() {
    connection.query("select * from products", function(err, results) {
        if (err) throw err;
        console.log("Welcome Select the ID of the item you would like!")
        console.log('  Item_ID  |      Product Name      |  Department Name  |   Price  | In Stock');
        console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ')

        for(let i = 0; i < results.length; i++){

           
            let itemID = results[i].item_id + ''; 
        
            let productName = results[i].product_name + ''; 
             
        
            let departmentName = results[i].department_name + ''; 
          
        
            let price = '$' + results[i].price + ''; 
            
        
            let quantity = results[i].stock_quantity + ''; // 
            // ----------------------------------------------
        
            console.log(itemID + '|    ' + productName + '|     ' + departmentName + '|      ' + price + '|    ' + quantity);
           
          }
          Start();

    });

}

let newQuantity ;

function Start(){
  

    inquirer
      .prompt([
        {
        name: "item_id",
        type: "input",
        message: "What is the ID of the product you want?",
        validate: function(num){
            if (isNaN(num)===false){
                return true;
            }

        },
        },
       
        


      ])

    
    .then(function(answer) {
        // const query = "SELECT * FROM products WHERE item_id = ?";
        console.log(answer.item_id)
        connection.query("SELECT * FROM products WHERE ? ", { item_id: answer.item_id }, function(err, item) {[]
          
              console.log(`Product: ${item[0].product_name} || Department: ${item[0].department_name} || PRICE: ${item[0].price} ||STOCK:  ${item[0].stock_quantity} `);
              
           newQuantity = `${item[0].stock_quantity}`
           
           

           stockSelect();
              
              
             
        });



            });
          
        };
   
      
  
 
function stockSelect(){
console.log(newQuantity)
    inquirer
      .prompt([
        {
        name: "quantity",
        type: "input",
        message: "How many would you Like?",
        validate: function(num){
            if (isNaN(num)===false){
                return true;
            }

        },
        },
       
        


      ])

    
    .then(function(answer) {
        // const query = "SELECT * FROM products WHERE item_id = ?";
       

       let myQuant = answer.quantity
        reduceQuantity = newQuantity - myQuant
        console.log(reduceQuantity)
        
        connection.query("SELECT * FROM products WHERE ? ", { quantity: answer.quantity }, function(err, item) {[]
          
            
              
           
              
              
              
        });



            });
          
        };

    

        
        
                     

        

  



//         })
//         .then(function(answer) {
//             console.log(answer.stock_quantity)
//             connection.query("select stock_quantity from products", {stock_quantity: answer.stock_quantity}, function(err, stock){[]
//                     console.log(`Stock: ${stock.stock_quantity}`)


//             })

//         }
        
        
        
//         )





//   }