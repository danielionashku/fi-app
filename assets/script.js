console.log('javascript has successfully executed 🙌');


// option 1 uses formdata
var formAssets = new FormData();

function addAsset() {
  formAssets.append('checking', value);
  formAssets.append('savings', value);
  formAssets.append('cash', value);
  formAssets.append('auto', value);
}

// option 2 uses new operator

function assets(checking, savings, cash, house, crypto, misc) {
  this.checking = checking;
  this.savings = savings;
  this.cash = cash;
  this.house = house;
  this.crypto = crypto;
  this.misc = misc;
}

const assetsTotal = new assets(4,3,3,2,4,1);





function depreciatingAsset(make, model, year, miles) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.miles = miles;
}

const car1 = new Car('Eagle', 'Talon TSi', 1993);

console.log(car1.make);
// expected output: "Eagle"





function assignChecking() {
  var checkingBalance = document.getElementById("checking").value;
  document.getElementById("printChecking").innerHTML = "Your checking balance is: $" + checkingBalance
}




var savings = 2
var cash = 201
var crypto = 123
var property = 1241

var assets = checking + savings + cash + crypto + property


//liabilities
let auto1 = 0
var auto2 = 10
var mortgage = 0
var creditcards = 0
var miscLiabilities = 0

var liabilities = auto1 + auto2 + mortgage + creditcards + miscLiabilities

// Historical Values

//NW
var NW = assets - liabilities
  


//document.getElementById("checking").innerHTML = "Your Net Worth is $" + NW
//document.getElementById("assets").innerHTML = "Assets: $" + assets
//document.getElementById("liabilities").innerHTML = "Liabilities: $" + liabilities