var mysql = require("mysql")
var inquirer = require("inquirer")

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
})


connection.connect(function (err) {
  if (err) throw err;
  runSearch();
})


function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all items for sale",
        // "Search for a specific item",
        // "Search by category",
        "Quit"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View all items for sale":
          listItems()
          break

        case "Search for a specific item":
          itemSearch()
          break

        case "Search by category":
          categorySearch()
          break

        case "Quit":
          console.log("KTHXBYE!")
          process.exit(-1)

          break

      }
    });
}

function listItems() {
  console.log("\n")
  var query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products"
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {

      console.log("ID: " + res[i].item_id + "  Name: " + res[i].product_name + " Department: " + res[i].department_name + "  $" + res[i].price + " Available: " + res[i].stock_quantity);
    }
    shouldIBuy()
  })

}


function shouldIBuy() {
  inquirer
    .prompt({
      name: "buy",
      type: "list",
      message: "Do you want to buy something?",
      choices: [
        "YES",
        "NO"
      ]
    })
    .then(function (answer) {
      switch (answer.buy) {
        case "YES":
          selectSomething()
          break

        case "NO":
          runSearch()
          break

      }
    });
}


function selectSomething() {
  inquirer
    .prompt({
      name: "itemID",
      type: "input",
      message: "Enter an Item Number"
    })
    .then(function (selection) {
      selectQuantity(selection.itemID)
    })

}

function selectQuantity(itemID) {
  inquirer
    .prompt({
      name: "quantity",
      type: "input",
      message: "Enter the quantity"
    })
    .then(function (selection) {
      console.log("you selected: " + itemID)
      console.log("quantity: " + selection.quantity)
      var query = "SELECT * from products where ?"
      connection.query(query, {
        item_id: itemID
      }, function (err, res) {
        var quantityAvailable = res[0].stock_quantity
        var myTotal = res[0].price * selection.quantity
        if (quantityAvailable < selection.quantity) {
          console.log("There are only " + quantityAvailable + " units in stock.")
          console.log("You are too greedy! Choose less or buy something else")
          runSearch()
        } else {
          var ammountLeft = quantityAvailable - selection.quantity
          buySomething(itemID, ammountLeft)
          console.log("Congratulations you bought it!")
          console.log("your total cost was: $" + myTotal)
        }


      })

    })

}

function buySomething(itemID, newAmmount) {
  var sql = "UPDATE products SET stock_quantity = ? WHERE item_id = ?"
  connection.query(sql, [newAmmount, itemID], function (err, res) {
    if (err) throw err
    listItems()
  })
}