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

showTable()

});


function showTable() {
    connection.query("select * from products", function(err, results) {
        if (err) throw err;
        console.log("Welcome to Bamazon!! Select the ID of the item you would like!")
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
          Start();

    });

}

let newQuantity ;
let reduceQuantity;
let myItemNew ;
let price;
let totalPurchase;

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
        
        connection.query("SELECT * FROM products WHERE ? ", { item_id: answer.item_id }, function(err, item) {[]
            let  table = new Table({
                head: ['Product Name',  'Department Name',  'Price', 'In Stock']
              
            });
             
            // table is an Array, so you can `push`, `unshift`, `splice` and friends
            table.push(
                [`${item[0].product_name}` , `${item[0].department_name}` , `${item[0].price}`, `${item[0].stock_quantity} `]
            
            );
           
            console.log(table.toString())
          
          
             
              
           newQuantity = `${item[0].stock_quantity}`
           price = `${item[0].price}`
        
           myItemNew = answer.item_id

           stockSelect();
              
              
             
        });



            });
          
        };
   
      
  
 
function stockSelect(){

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
        // console.log(reduceQuantity)
        // console.log(myItemNew)

        connection.query("Select * from products Where ? ", [{item_id: myItemNew }], function(err, item) {[]
          
          
            if(err) throw err

            if (item[0].stock_quantity < myQuant){
                console.log("Sorry there are only " + item[0].stock_quantity + " left, please enter a different amount")
                stockSelect();
            } else {



            connection.query("UPDATE products SET ? WHERE ? ", [{ stock_quantity: reduceQuantity}, {item_id: myItemNew }], function(err, item) {[]
             
             
               if(err) throw err
             
               
            connection.query("Select * from products Where ? ", [{item_id: myItemNew }], function(err, item) {[]

                if(err) throw err

                let price = `${item[0].price}` *  myQuant
                let totalPurchase = price

                console.log("You have Purchased the " + `${item[0].product_name}` + " The total cost of your purchase is $" + totalPurchase)
                askAgain()
              
                   
                   
                  
             });
          
         
           
                
                
               
          })
        }
    })
    });
};
     
              
              
         


     
              
              
        
    
        
    


    function askAgain (){


        inquirer.prompt({
                type: "confirm",
                name:"ask",
                message: "Would you like to purchase another item?"
                

        }).then(function(response){
                
            

         if(response.ask === true){

                    showTable();
                } else {
              
        
                console.log("Thank you for shopping, Hope we see you again")
               

                process.exit();
                }

        });



    }


    

        
        
                     

        

  



//         })
//         .then(function(answer) {
//             console.log(answer.stock_quantity)
//             connection.query("select stock_quantity from products", {stock_quantity: answer.stock_quantity}, function(err, stock){[]
//                     console.log(`Stock: ${stock.stock_quantity}`)


//             })

//         }
        
        
        
//         )





//   }