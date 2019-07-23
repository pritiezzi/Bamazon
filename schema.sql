DROP DATABASE IF EXISTS BamazonDB;
CREATE database BamazonDB;

USE BamazonDB;

CREATE TABLE products (
  item_id INT(100) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR (100) NOT NULL,
  stock_quantity VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price VARCHAR(100) NOT NULL,
  PRIMARY KEY (item_id)
);