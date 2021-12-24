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

  .post('/api', (req, res) => {
    console.log(req.body);
    const networth = req.body;
    database.insert(networth);
    res.json({
      status: 'success'
    });
  })

  .listen(port, () => console.log(`Server listening on port ${port}`));