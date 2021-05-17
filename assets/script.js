var ctx = document.getElementById('myChart');

var assets = {
  checking: {
    "2021-01-01": 100,
    "2021-02-01": 200,
    "2021-03-01": 0,
    "2021-04-01": 400, 
    "2021-05-01": 475
  },
  savings: {
    "2021-01-01": 200,
    "2021-02-01": 350,
    "2021-03-01": 650,
    "2021-04-01": 1023, 
    "2021-05-01": 975
  },
  cash: {
    "2021-01-01": 50,
    "2021-02-01": 275,
    "2021-03-01": 65,
    "2021-04-01": 120, 
    "2021-05-01": 25
  },
  bitcoin: {
    "2021-01-01":	0,
    "2021-02-01":	0,
    "2021-03-01":	0,
    "2021-04-01":	0,
    "2021-05-01":	0
  }
}

// TODO: Create function that turns assets & liabilities objects into tables. https://stackoverflow.com/questions/17684201/create-html-table-from-javascript-object/17684427

var liabilities = {
  creditcard: {
    "2021-01-01": -1214,
    "2021-02-01": -800,
    "2021-03-01": -700,
    "2021-04-01": -600, 
    "2021-05-01": -550
  },
  autoloan: {
    "2021-01-01": -22540,
    "2021-02-01": -22000,
    "2021-03-01": -21000,
    "2021-04-01": -20000, 
    "2021-05-01": -19000
  },
  mortgage: {
    "2021-01-01": -686000,
    "2021-02-01": -680000,
    "2021-03-01": -670000,
    "2021-04-01": -660000, 
    "2021-05-01": -650000
  }
}

var dates = {
  "2021-01-01":	0,
  "2021-02-01":	0,
  "2021-03-01":	0,
  "2021-04-01":	0,
  "2021-05-01":	0
}

function newAsset() {
  var newasset = $('#newasset')[0].value;
  if (newasset == !isNaN) {
    console.log("Please Enter Asset");
  } else {
    assets[newasset] = dates;
    console.log(assets);
  }
}

function newLiability() {
  var newliability = $('#newliability')[0].value;
  if (newliability == !isNaN) {
    console.log("Please Enter Liability");
  } else {
    liabilities[newliability] = dates;
    console.log(liabilities);
  }
}


function newEntry() {
  if ($('#date')[0].value == !isNaN){
    alert("Please enter a valid date")
    } else {
    dates[$('#date')[0].value] = 0; // adds the date to the list of dates which is needed to be up to date when a new asset or liability is added
    var checkingBalance = $('#checking')[0].value; 
    var savingsBalance = $('#savings')[0].value; 
    var cashBalance = $('#cash')[0].value; 
    if (checkingBalance == !isNaN) {
      console.log("Checking Balance is Empty")
    } else {
      assets.checking[$('#date')[0].value] = parseInt(checkingBalance);
    } 
    if (savingsBalance == !isNaN) {
      console.log("Savings Balance is Empty")
    } else {
      assets.savings[$('#date')[0].value] = parseInt(savingsBalance);
    }
    if (cashBalance == !isNaN) {
      console.log("Cash Balance is Empty") 
    } else {
      assets.cash[$('#date')[0].value] = parseInt(cashBalance);
    }
    var table = document.getElementById("NWTable");
    var totalRowCount = table.rows.length;

    // TODO: Add lines to this function that will automatically add a new row to the table infront of the input row 
    // document.createElement("tr")[totalRowCount];
    document.createElement("tr")[totalRowCount-1];
    console.log(assets)
  }
}

// Chart Color Definitions — NOT CURRENTLY USED
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

// Plugin that allows chart data to come from an object
// TODO update code so that it looks over all the different properties of an object. e.g. like this:
Chart.pluginService.register({
  beforeInit: function(chart) {
    var data = chart.config.data;
    var i = -1;
    for (k in assets) {
      data.datasets.push({
        label: k,
        fill: true,
        // backgroundColor: colors.orange.fill, TODO: Need to create random custom colors
        // borderColor: colors.orange.stroke, TODO: Need to create random custom colors
        data: [],
      })
      i++;
      for (var key in assets[k]) {
        if (assets[k].hasOwnProperty(key)) {
        data.datasets[i].data.push(assets[k][key]);
      }
    }
  }
}
}
);


// Chart Rendering
var myChart = new Chart(ctx, {
    type: 'line', 
    data: {
      labels: Object.getOwnPropertyNames(dates), // uses all the dates from the dates object
      datasets: []
    }, 
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
    } 
  }
)
