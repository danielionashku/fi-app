var ctx = document.getElementById('myChart');

var assets = {};

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

const dates = {
  "2021-01-01":	0,
  "2021-02-01":	0,
  "2021-03-01":	0,
  "2021-04-01":	0,
  "2021-05-01":	0
}

var totalsassets = {
  "2021-01-01":	0,
  "2021-02-01":	0,
  "2021-03-01":	0,
  "2021-04-01":	0,
  "2021-05-01":	0
}

// variable declarations

var assetsTable = document.getElementById("assetsTable");

function addColumn() {
  [...document.querySelectorAll('#assetsTable tr')].forEach((row, i) => {
      const input = document.createElement("input")
      input.setAttribute('type', 'number')
      const cell = document.createElement(i ? "td" : "td")
      cell.appendChild(input)
      row.appendChild(cell)
      var colTitle = document.getElementById("assetsTable").rows[0].cells[row.cells.length-1];
      colTitle.innerHTML = $('#newasset')[0].value;
  });
}

function newAsset() {
  var newasset = $('#newasset')[0].value;
  if (newasset == !isNaN) {
    console.log("Please Enter Asset");
  } else {
    assets[newasset] = {...dates};
    console.log(assets);
    addColumn();
    var addIDtoNewInput = document.querySelector('table tr:nth-last-child(2) td:last-child input')
    addIDtoNewInput.style.backgroundColor = "red";
    addIDtoNewInput.setAttribute('id', $('#newasset')[0].value);
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

// this will iterate over every column and add a new row for each
function addRow (argument) {
      var currentRow = assetsTable.insertRow(assetsTable.rows.length -2);
      var everyChild = document.querySelectorAll("#inputRow input");
      for (var i = 0; i < everyChild.length; i++) {
          var cellID = document.querySelectorAll("#inputRow input")[i].id;
          currentCell = currentRow.insertCell();
          var x = document.createElement("input");
          currentCell.appendChild(x);
          x.setAttribute("Value", $(`#${cellID}`)[0].value);
          $(`#${cellID}`)[0].value = "";
      };
    }

// takes the values entered in the input table row and adds them to the assets object. then it runs the addRow() function to create a new row with this data
// will need to create a similar function for liabilities
function newEntry() {
  var date = $('#date')[0].value;
  if (date == !isNaN){
    alert("Please enter a valid date")
    } else {
    dates[date] = 0; // adds the date to the list of dates 
    var countChildren = document.querySelectorAll("#inputRow input:not(#totalassets)");
      for (var i = 1; i < countChildren.length; i++) { 
        var cID = document.querySelectorAll("#inputRow input:not(#totalassets)")[i].id;
        var itemBalance = $(`#${cID}`)[0].value;
        if (itemBalance == !isNaN) {
          console.log(`${cID} Balance is Empty`);
        } else {
          assets[cID][date] = parseInt(itemBalance);
        }
      }
    }
    addRow();
    addTotals(assets);
    updateChart(myChart);
  };


function addTotals(obj) {
  var i = 0;
  var name = [];
  var propSum = [];
  for (prop in obj) {
    name[i] = prop;
    i += 1;
    prop = Object.values(obj[prop]);
    propSum[i-1] = prop.reduce(function(a, b) {
      return a + b;
    }, 0);
  }
  // TODO: add name + totals to table
  for (i=0; i<name.length; i++) {
    console.log(`${name[i]} total: ${propSum[i]}`)
  }
}


// Third Party plugin that allows chart data to come from an object
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
});

// Updates the chart with new data
function updateChart(chart) {
      var i = -1;
      for (k in assets) {
        chart.data.datasets.push({
          label: k,
          fill: true,
          // backgroundColor: colors.orange.fill, TODO: Need to create random custom colors
          // borderColor: colors.orange.stroke, TODO: Need to create random custom colors
          data: [],
        })
        i++;
        for (var key in assets[k]) {
          if (assets[k].hasOwnProperty(key)) {
          chart.data.datasets[i].data.push(assets[k][key]);
          }
        }
      }
  chart.update();
}

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
