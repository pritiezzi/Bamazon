DROP DATABASE IF EXISTS BamazonDB;
CREATE database BamazonDB;

USE BamazonDB;

CREATE TABLE BamazonDB (
  item_id VARCHAR(100)NULL,
  product_name VARCHAR (100)NULL,
  stock_quantity VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price VARCHAR(100)NULL,
  raw_total DECIMAL(10,4) NULL,
  raw_usa DECIMAL(10,4) NULL,
  raw_uk DECIMAL(10,4) NULL,
  raw_eur DECIMAL(10,4) NULL,
  raw_row DECIMAL(10,4) NULL,
  PRIMARY KEY (position)
);

SELECT * FROM Bamazon;