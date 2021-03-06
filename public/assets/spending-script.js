var ctx = document.getElementById('myChart');

var networth = {
  "assets": {},
  "liabilities": {}
}

var spendingTotals = {};
var nwTable = document.getElementById("nwTable");
var numAssets = Object.keys(networth.assets).length;
var numLiabilities = Object.keys(networth.liabilities).length;

const dates = {};

function addColumn(itemType) {
  [...document.querySelectorAll('#nwTable tr')].forEach((row, i) => {
      const input = document.createElement("input")
      input.setAttribute('type', 'number')
      const cell = document.createElement(i ? "td" : "td")
      cell.appendChild(input)
      row.appendChild(cell)
      var colTitle = document.getElementById("nwTable").rows[0].cells[row.cells.length-1];
      // need to check if asset or liability type is passed
      colTitle.innerHTML = $(`#${itemType}`)[0].value;
  });
}

function newCategory() {
  var newCategory = $('#newCategory')[0].value;
  if (newCategory == !isNaN) {
    console.log("Please Enter Asset");
  } else {
    networth.assets[newCategory] = {...dates};
    console.log(networth.assets);
    addColumn('newCategory');
    var addIDtoNewInput = document.querySelector('table tr:nth-last-child(2) td:last-child input')
    addIDtoNewInput.style.backgroundColor = "red";
    addIDtoNewInput.setAttribute('id', $('#newCategory')[0].value);
  }
}

function newLiability() {
  var newLiability = $('#newLiability')[0].value;
  if (newLiability == !isNaN) {
    console.log("Please Enter Liability");
  } else {
    networth.liabilities[newLiability] = {...dates};
    console.log(networth.liabilities);
    addColumn('newLiability');
    var addIDtoNewInput = document.querySelector('table tr:nth-last-child(2) td:last-child input')
    addIDtoNewInput.style.backgroundColor = "red";
    addIDtoNewInput.setAttribute('id', $('#newLiability')[0].value);
  }
}

// Iterates over every column and adds a new row for each one
function addRow (argument) {
      var currentRow = nwTable.insertRow(nwTable.rows.length -2);
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

// Takes asset & liability values entered in the input table row and adds them to their respective objects.
function newEntry() {
  var date = $('#date')[0].value;
  if (date == !isNaN){
    alert("Please enter a valid date")
    } else {
    dates[date] = 0; // adds the date to the list of dates
    var countChildren = document.querySelectorAll("#inputRow input:not(#spendingTotalss)");
      for (var i = 1; i < countChildren.length; i++) { 
        var cID = document.querySelectorAll("#inputRow input:not(#spendingTotalss)")[i].id;
        var itemBalance = $(`#${cID}`)[0].value;
        if (itemBalance == !isNaN) {
          console.log(`${cID} Balance is Empty`);
        } else {
          if (Object.values(networth)[0].hasOwnProperty(`${cID}`) === true) {
            networth.assets[cID][date] = parseInt(itemBalance);
          } else {
            networth.liabilities[cID][date] = parseInt(itemBalance);
          }
        }
      }
      addRow();
      addTotals(networth.assets);
      addTotals(networth.liabilities);
      updateChart(myChart);
    }
  };


function addTotals(obj) {
  var i = 0;
  var name = [];
  var propSum = [];
  for (prop in obj) {
    name[i] = prop;
    i++;
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
    var i = 0;
    for (prop in networth.assets) {
      data.datasets.push({
        label: prop,
        fill: true,
        // backgroundColor:
        // borderColor:
        data: [],
      })
      for (var key in networth.assets[prop]) {
        if (networth.assets[prop].hasOwnProperty(key)) {
        data.datasets[i].data.push(networth.assets[prop][key]);
        }
      }
    }
    for (prop in networth.liabilities) {
      data.datasets.push({
        label: prop,
        fill: true,
        // backgroundColor:
        // borderColor:
        data: [],
      })
      for (var key in networth.liabilities[prop]) {
        if (networth.liabilities[prop].hasOwnProperty(key)) {
        data.datasets[i].data.push(networth.liabilities[prop][key]);
        }
      }
    } i++;
  }
});




// Updates the chart with new data
function updateChart(chart) {
  for (prop in networth.assets) {
    chart.data.datasets.pop({
      label: prop,
      fill: true,
      data: [],
    })
  }
  for (prop in networth.liabilities) {
    chart.data.datasets.pop({
      label: prop,
      fill: true,
      data: [],
    })
  }
  var i = -1;
  for (prop in networth.assets) {
    chart.data.datasets.push({
      label: prop,
      fill: true,
      // backgroundColor:
      // borderColor:
      data: [],
    })
    i++;
    for (var key in networth.assets[prop]) {
      chart.data.datasets[i].data.push(networth.assets[prop][key]); 
    }
  }
  var n = i +1;
  for (prop in networth.liabilities) {
    chart.data.datasets.push({
      label: prop,
      fill: true,
      // backgroundColor:
      // borderColor:
      data: [],
    })
    i++;
    for (var key in networth.liabilities[prop]) {
      chart.data.datasets[n].data.push(networth.liabilities[prop][key]); 
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
