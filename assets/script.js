console.log('javascript has successfully executed 🙌');

var ctx = document.getElementById('myChart');

var date = ["4/01/21", "4/02/21", "4/03/21"];
var checking = [100, 200, 300];
var savings = [200, 350, 650];
var cash = [50, 650, 65];
var arrayOfAssets = [checking, savings, cash];

// adding each asset types together to generate a total. Uses index position of arrays to calculate totals. E.g. Checking[0] + Savings[0] + Cash[0]
// more info: https://stackoverflow.com/questions/32139773/sum-array-of-arrays-matrix-vertically-efficiently-elegantly
let assetTotals = arrayOfAssets.reduce(function(array1, array2) {
  return array1.map(function(value, index) {
    return value + array2[index];
  });
});

// checking to ensure totals are correct
console.log(assetTotals)


// takes the most recent asset totals and puts them into a new array
let currentAssets = [checking.pop(),savings.pop(),cash.pop()]


// Chart Rendering
var myChart = new Chart(ctx, {
    type: 'line', // other options: pie, line, etc
    data: {
      labels: date,
      datasets: [{
        label: 'testing charts',
        data: assetTotals,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)"
          ],
          borderWidth: 1
      }]
    }, // configuration options to customize the charts such as changing the position of legend, enable/disable responsiveness, control styling, etc.
    options: {} // this is optional
  }
)





/* THIS IS OLD stuff I was playing around with
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

*/