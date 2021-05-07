console.log('Javascript has successfully ran 🙌');

var ctx = document.getElementById('myChart');

var date = ["1/01/21", "2/01/21", "3/01/21", "4/01/21", "5/01/21"];
var checking = [100, 200, 300, 400, 475];
var savings = [200, 350, 650, 1023, 975];
var cash = [50, 13, 65, 120, 25];
var arrayOfAssets = [checking, savings, cash];


var checkingObj = {
  name: "Chase Checking",
  history: {
    "1/01/21": 100,
    "2/01/21": 200,
    "3/01/21": 300,
    "4/01/21": 400, 
    "5/01/21": 475
  },
};

var savingsObj = {
  name: "Chase Savings",
  history: {
    "1/01/21": 200,
    "2/01/21": 350,
    "3/01/21": 650,
    "4/01/21": 1023, 
    "5/01/21": 975
  },
};

var cashObj = {
  name: "Cash under the Mattress",
  history: {
    "1/01/21": 50,
    "2/01/21": 13,
    "3/01/21": 65,
    "4/01/21": 120, 
    "5/01/21": 25
  },
};

function newDate() {
  var text = document.getElementById("date").value;
  alert("The user typed '" + text + "'");
}

function newChecking() {
  var text = document.getElementById("checking").value;
  alert("The user typed '" + text + "'");
}

function newSavings() {
  var text = document.getElementById("savings").value;
  alert("The user typed '" + text + "'");
}

function newCash() {
  var text = document.getElementById("cash").value;
  alert("The user typed '" + text + "'");
}

function newTotals() {
  var text = document.getElementById("totals").value;
  alert("The user typed '" + text + "'");
}

// window prompt (delete)
//checkingObj.history[("6/01/21")] = window.prompt("How much: ");
//console.log(checkingObj.history)


// adding each asset types together to generate a total. Uses index position of arrays to calculate totals. E.g. Checking[0] + Savings[0] + Cash[0]
// more info: https://stackoverflow.com/questions/32139773/sum-array-of-arrays-matrix-vertically-efficiently-elegantly
let assetTotals = arrayOfAssets.reduce(function(array1, array2) {
  return array1.map(function(value, index) {
    return value + array2[index];
  });
});

// checking to ensure totals are correct
console.log(assetTotals)

// Chart Color Definitions
const colors = {
  orange: {
    fill: '#ffa600',
    stroke: '#e0eadf',
  },
  green: {
    fill: '#A1DF65',
    stroke: '#e0eadf',
  },
  darkBlue: {
    fill: '#58508d',
    stroke: '#3282bf',
  },
  purple: {
    fill: '#8fa8c8',
    stroke: '#75539e',
  },
};

// Chart Rendering
var myChart = new Chart(ctx, {
    type: 'line', // other options: pie, line, etc
    data: {
      labels: date,
      datasets: [{
        label: 'Checking',
        fill: true,
        backgroundColor: colors.orange.fill,
        borderColor: colors.orange.stroke,
        data: checking,
      }, {
        label: "Savings",
        fill: true,
        backgroundColor: colors.darkBlue.fill,
        borderColor: colors.darkBlue.stroke,
        data: savings,
      }, {
        label: "Cash",
        fill: true,
        backgroundColor: colors.green.fill,
        borderColor: colors.green.stroke,
        data: cash,
      }]
    }, // configuration options to customize the charts such as changing the position of legend, enable/disable responsiveness, control styling, etc.
    options: {
      responsive: true,
      scales: {
        xAxes: [{ 
            gridLines: {
                display: false,
            },
            ticks: {
              fontColor: "white",
              fontSize: 16,
            },
        }],
        yAxes: [{
            stacked: true,
            display: true,
            gridLines: {
                display: false,
            },
            ticks: {
              fontColor: "white",
              fontSize: 16,
            },
        }],
      },
      animation: {
        duration: 2000,
      },
      legend: {
          labels: {
              fontColor: "white",
              fontSize: 16,
          }
     },
    } // this is optional
  }
)


/* 
super complicated way of returning the last property value of an object inside another object. This might be unecessary and will likely not be used. more info: https://stackoverflow.com/questions/4317456/getting-the-last-item-in-a-javascript-object

No. Order is not guaranteed in JSON and most other key-value data structures, so therefore the last item could sometimes be carrot and at other times be banana and so on. 
If you need to rely on ordering, your best bet is to go with arrays. 
The power of key-value data structures lies in accessing values by their keys, not in being able to get the nth item of the object.

var currentBalance = objectTest.history[Object.keys(objectTest.history)[Object.keys(objectTest.history).length -1]]
console.log(test)
*/


/*
// takes the most recent asset totals and puts them into a new array. this breaks stacked charts though
// let currentAssets = [checking.pop(),savings.pop(),cash.pop()]

//THIS IS OLD stuff I was playing around with
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