DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

use bamazon_db;
CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NOT NULL,

  price DECIMAL(10,2) NOT NULL,
  stock_quantity int not null,
  PRIMARY KEY (item_id)
);


insert into products (product_name, department_name, price, stock_quantity)
values ("coffee table", "furniture", 250.00, 10),
("nintendo Switch", "electronics", 350.00, 20),
("Scented Candles", "Home", 4.99, 200),
("Shelf", "furniture", 25.00, 34),
("ps4", "electronics", 375.00, 10),
("Rug", "home", 100.00, 12),
("magic lamp", "rare", 9999999.00, 1),
("soda", "food", 3.00, 50),
("dog food", "pets", 49.00, 18),
("laptop", "electronics", 1375.00, 3),
("monopoly", "games", 25.00, 15),
("chess", "games", 15.00, 10),
("water container", "electronics", 55.00, 6);

select * from products