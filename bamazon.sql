DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;


CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NOT NULL,

  price DECIMAL(10,2) NOT NULL,
  stock_quantity int not null,
  PRIMARY KEY (id)
);
