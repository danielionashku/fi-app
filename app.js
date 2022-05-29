const express = require('express');
const Datastore = require('nedb');
const bodyParser = require('body-parser');
const fs = require("fs").promises;

const database = new Datastore('database.db');
database.loadDatabase();
const app = express();
const port = 3000;

async function main() {
}

main();

app
  .use(express.static('public'))
  .use(express.urlencoded({ extended: true}))
  .use(express.json())

  // adds new assets or liabilities
  .post('/api', (req, res) => {
    const networth = req.body;
    const timestamp = Date.now();
    networth.timestamp = timestamp;
    database.insert(networth);
    res.json(networth);
  })

  // adds new date & value entries for each asset or liability
  .post('/entries', (req, res) => {
    const networth = req.body;
    const timestamp = Date.now();
    networth.timestamp = timestamp;
    database.insert(networth);
    res.json(networth);
  })

  // loads the latest networth data 
  .get('/api', (req, res) => {
    database.find({}).sort({"timestamp":-1}).limit(1).exec( function (err, data) {
      res.json(data[0])
    })
  })

  .listen(port, () => console.log(`Server listening on port ${port}`));