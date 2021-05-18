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


// this will iterate over every type
function addRow (argument) {
  if ($('#date')[0].value == !isNaN){
    // alert("Please enter a valid date")
    } else {
      var NWTable = document.getElementById("NWTable");
      var currentRow = NWTable.insertRow(NWTable.rows.length -1);
    
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
  }

// specific to assets. will need new function for liabilities
function newEntry() {
  if ($('#date')[0].value == !isNaN){
    alert("Please enter a valid date")
    } else {
    dates[$('#date')[0].value] = 0; // adds the date to the list of dates 
    var countChildren = document.querySelectorAll("#inputRow input");
      for (var i = 1; i < countChildren.length; i++) {
        var cID = document.querySelectorAll("#inputRow input")[i].id;
        var itemBalance = $(`#${cID}`)[0].value;
        if (itemBalance == !isNaN) {
          console.log(`${cID} Balance is Empty`);
        } else {
          assets[cID][$('#date')[0].value] = parseInt(itemBalance);
        }
        addRow();
      }
    }
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