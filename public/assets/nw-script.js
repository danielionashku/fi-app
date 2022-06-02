var ctx = document.getElementById('myChart');

var dates = {}

// when page loads, this retrieves the data from the database.db file. it retrieves all data from the file. may need future update to exclude non nw data
getNW();
async function getNW() {
  const response = await fetch('/api');
  dbnw = await response.json();
  nw = dbnw;

  // creates the dates object based on whats already in the db 
  for (prop in dbnw.networth.assets) {
    dbdates = (Object.keys(dbnw.networth.assets[prop]))
    }  
  for (let i = 0; i < dbdates.length; i++) {
      dates[(dbdates[i])] = 0;
    }
  console.log("Recorded Dates: " + Object.getOwnPropertyNames(dates))
  updateChart(myChart);
  addTotals(nw.networth.assets);
  addTotals(nw.networth.liabilities);
  totalAssets(nw.networth.assets);
  totalLiabilities(nw.networth.liabilities);

  // looks like i have to delete these properties, otherwise the post methods don't work for some reason. 
  delete nw.timestamp;
  delete nw._id;
  
  // returns an array of assets & liabilites that can then be used to create table columns
  // enabling this will allow new columns to be created but it breaks the input row logic. 
  // next step depends on how we choose to proceed. i think i should switch to SQL and learn PHP

//   assetsArray = (Object.keys(dbnw.networth.assets))
//   liabilitiesArray = (Object.keys(dbnw.networth.liabilities))
//   for (var i = 0; i < assetsArray.length; i++) {
//     createTableColumns(assetsArray[i])
//   }
//   for (var i = 0; i < liabilitiesArray.length; i++) {
//     createTableColumns(liabilitiesArray[i])
//   }
}

// this may be redundant at this point since it is overriden in the getNW() function that is called on page load. keeping for now 
var nw = {
  "networth": {
    "assets": {},
    "liabilities": {}
  }
}

var assetTotals = {};
var nwTable = document.getElementById("nwTable");
var numAssets = Object.keys(nw.networth.assets).length;
var numLiabilities = Object.keys(nw.networth.liabilities).length;

// create table columns based on existing data
function createTableColumns(colName) {
  [...document.querySelectorAll('#nwTable tr')].forEach((row, i) => {
      const input = document.createElement("input")
      input.setAttribute('type', 'number')
      const cell = document.createElement(i ? "td" : "td")
      cell.appendChild(input)
      row.appendChild(cell)
      var colTitle = document.getElementById("nwTable").rows[0].cells[row.cells.length-1];
      colTitle.innerHTML = colName;
  });
}


function orderAssets() {
  var orderedAssets = {}
  for (prop in nw.networth.assets) {
  orderedAssets[prop] = Object.keys(nw.networth.assets[prop]).sort().reduce(
      (obj, key) => { 
        obj[key] = nw.networth.assets[prop][key];
        return obj;
      }, 
      {}
  );
  }
  return orderedAssets;
}

function orderLiabilities() {
  var orderedLiabilities = {}
  for (prop in nw.networth.liabilities) {
  orderedLiabilities[prop] = Object.keys(nw.networth.liabilities[prop]).sort().reduce(
      (obj, key) => { 
        obj[key] = nw.networth.liabilities[prop][key];
        return obj;
      }, 
      {}
  );
  }
  return orderedLiabilities;
}

function orderDates() {
  var orderedDates = Object.keys(dates).sort().reduce(
    (obj, key) => { 
      obj[key] = dates[key]; 
      return obj;
    }, 
    {}
  );
  return orderedDates;
}

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

function newAsset() {
  var newAsset = $('#newAsset')[0].value;
  if (newAsset == !isNaN) {
    console.log("Please Enter Asset");
  } else {
    nw.networth.assets[newAsset] = {...dates};
    addColumn('newAsset');
    var addIDtoNewInput = document.querySelector('table tr:nth-last-child(2) td:last-child input')
    addIDtoNewInput.style.backgroundColor = "red";
    addIDtoNewInput.setAttribute('id', $('#newAsset')[0].value);

    // this code should add an ID to the totals row but its currently broken so be careful
    var addIDtoTotalsRow = document.querySelector('#totalsRow td:last-child input')
    addIDtoTotalsRow.setAttribute('id', $('#newAsset')[0].value + "Total");
    addIDtoTotalsRow.parentElement.innerHTML = "tbd"
  }
  // TODO: Set timer to ensure this doesnt run until after the data is stored in the backend
  document.getElementById("newAsset").value = "";
}

function newLiability() {
  var newLiability = $('#newLiability')[0].value;
  if (newLiability == !isNaN) {
    console.log("Please Enter Liability");
  } else {
    nw.networth.liabilities[newLiability] = {...dates};
    addColumn('newLiability');
    var addIDtoNewInput = document.querySelector('table tr:nth-last-child(2) td:last-child input')
    addIDtoNewInput.style.backgroundColor = "red";
    addIDtoNewInput.setAttribute('id', $('#newLiability')[0].value);

    // this code should add an ID to the totals row but its currently broken so be careful
    var addIDtoTotalsRow = document.querySelector('#totalsRow td:last-child input')
    addIDtoTotalsRow.setAttribute('id', $('#newLiability')[0].value + "Total");
    addIDtoTotalsRow.parentElement.innerHTML = "tbd"
  }
  // TODO: Set timer to ensure this doesnt run until after the data is stored in the backend
  document.getElementById("newLiability").value = "";
}

function addNew() {
  newAsset();
  newLiability();

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nw)
  };
  fetch('/api', options);
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
    var countChildren = document.querySelectorAll("#inputRow input");
      for (var i = 1; i < countChildren.length; i++) { 
        var cID = document.querySelectorAll("#inputRow input")[i].id;
        var itemBalance = $(`#${cID}`)[0].value;
        if (itemBalance == !isNaN) {
          console.log(`${cID} Balance is Empty`);
          if (Object.values(nw.networth)[0].hasOwnProperty(`${cID}`) === true) {
            nw.networth.assets[cID][date] = 0;
          } else if (Object.values(nw.networth)[1].hasOwnProperty(`${cID}`) === true) {
            nw.networth.liabilities[cID][date] = 0;
          }
        } else {
          if (Object.values(nw.networth)[0].hasOwnProperty(`${cID}`) === true) {
            nw.networth.assets[cID][date] = parseInt(itemBalance);
          } else if (Object.values(nw.networth)[1].hasOwnProperty(`${cID}`) === true) {
            nw.networth.liabilities[cID][date] = parseInt(itemBalance);
          }
        }
      }
      addRow();
      addTotals(nw.networth.assets);
      addTotals(nw.networth.liabilities);
      totalAssets(nw.networth.assets);
      totalLiabilities(nw.networth.liabilities);
      if (Object.keys(nw.networth.assets).length > 0) {
        nw.networth.assets = orderAssets();
        dates = orderDates();
      }
      if (Object.keys(nw.networth.liabilities).length > 0) {
        nw.networth.liabilities = orderLiabilities();
        dates = orderDates();
      }
      updateChart(myChart);
    }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nw),
  };
  fetch('/entries', options);
}

// This adds the total for the column, but does not add the totals from a row.
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
  for (i=0; i<name.length; i++) {
    console.log(`${name[i]} total: $${propSum[i]}`)
  }
}

// Returns the last date and value for all assets (pass "nw.networth.assets" into the function)
function totalAssets(obj) {
  var i = 0;
  var name = [];
  var newArrayWithBalances = [];
  for (prop in obj) {
    name[i] = prop;
    i++;
    lastDate = Object.keys(obj[prop]).pop();
    lastValue = Object.values(obj[prop]).pop();
    newArrayWithBalances.push(lastValue);
    lastName = name.pop();
    console.log(`${lastName} has a balance of $${lastValue} as of ${lastDate}`)
  }
  var totalAssets = 0;
	for (let i in newArrayWithBalances) {
    totalAssets += newArrayWithBalances[i];
    }
    document.getElementById("assets").innerHTML = `Total Assets: $${totalAssets}`;
}

// Returns the last date and value for all liabilities (pass "nw.networth.liabilities" into the function)
function totalLiabilities(obj) {
  var i = 0;
  var name = [];
  var newArrayWithBalances = [];
  for (prop in obj) {
    name[i] = prop;
    i++;
    lastDate = Object.keys(obj[prop]).pop();
    lastValue = Object.values(obj[prop]).pop();
    newArrayWithBalances.push(lastValue);
    lastName = name.pop();
    console.log(`${lastName} has a balance of $${lastValue} as of ${lastDate}`)
  }
  var totalLiabilities = 0;
	for (let i in newArrayWithBalances) {
    totalLiabilities += newArrayWithBalances[i];
    }
    if (totalLiabilities < 0) {
      totalLiabilities = totalLiabilities * -1
    }
  document.getElementById("liabilities").innerHTML = `Total Liabilities: -$${totalLiabilities}`;
}

// Third Party plugin that allows chart data to come from an object
Chart.pluginService.register({
  beforeInit: function(chart) {
    var data = chart.config.data;
    var i = 0;
    for (prop in nw.networth.assets) {
      data.datasets.push({
        label: prop,
        fill: true,
        // backgroundColor:
        // borderColor:
        data: [],
      })
      for (var key in nw.networth.assets[prop]) {
        if (nw.networth.assets[prop].hasOwnProperty(key)) {
          data.datasets[i].data.push(nw.networth.assets[prop][key]);
        }
      }
    }
    for (prop in nw.networth.liabilities) {
      data.datasets.push({
        label: prop,
        fill: true,
        // backgroundColor:
        // borderColor:
        data: [],
      })
      for (var key in nw.networth.liabilities[prop]) {
        if (nw.networth.liabilities[prop].hasOwnProperty(key)) {
          data.datasets[i].data.push(nw.networth.liabilities[prop][key]);
        }
      }
    } i++;
  }
});

// Updates the chart with new data
function updateChart(chart) {
  for (prop in nw.networth.assets) {
    chart.data.datasets.pop({
      label: prop,
      fill: true,
      data: [],
    })
  }
  for (prop in nw.networth.liabilities) {
    chart.data.datasets.pop({
      label: prop,
      fill: true,
      data: [],
    })
  }
  var i = 0
  for (prop in nw.networth.assets) {
    chart.data.labels = Object.getOwnPropertyNames(dates)
    chart.data.datasets.push({
      label: prop,
      fill: true,
      // backgroundColor:
      // borderColor:
      data: [],
    })
    for (var key in nw.networth.assets[prop]) {
      chart.data.labels = Object.getOwnPropertyNames(dates)
      chart.data.datasets[i].data.push(nw.networth.assets[prop][key]); 
    }
    i++;
  }
  var n = i;
  for (prop in nw.networth.liabilities) {
    chart.data.labels = Object.getOwnPropertyNames(dates)
    chart.data.datasets.push({
      label: prop,
      fill: true,
      // backgroundColor:
      // borderColor:
      data: [],
    })
    for (var key in nw.networth.liabilities[prop]) {
      chart.data.labels = Object.getOwnPropertyNames(dates)
      chart.data.datasets[n].data.push(nw.networth.liabilities[prop][key]); 
    }
    n++;
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
})

// keeps the client on the same page after button is clicked
$(function() {
  $('#addNew').on('submit', function(e) {
      var datax = $("#addNew :input").serialize();
      $.ajax({
          datax: datax,
      });
      e.preventDefault();
  });
});

$(function() {
  $('#nwValue').on('submit', function(e) {
      var datax = $("#nwValue :input").serialize();
      $.ajax({
          datax: datax,
      });
      e.preventDefault();
  });
});