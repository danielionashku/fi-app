const express = require('express');
const morgan = require('morgan');
const { Prohairesis } = require('prohairesis');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

const mySQLString = process.env.CLEARDB_DATABASE_URL;
const database = new Prohairesis(mySQLString);

app
  .use(morgan('dev'))
  .use(express.static('public'))
  .use(express.urlencoded({ extended: false}))
  .use(express.json())

  .get('/test', function(req, res){
    res.send("WHEEE");
   })

  .get('/api/fi-app', async(req,res) => {
    const users = await database.query(`
      SELECT
          *
      FROM
          User
      ORDER BY
          date_added DESC
    `);

    res.contentType('html');

    res.end(`
      ${users.map((user) => {
        return `<p>${user.new_asset} & ${user.new_liability} have been added.</p>`;
      }).join('')}
    `)
  })


  .post('/api/fi-app', async (req, res) => {
    const body = req.body;

    await database.execute(`

      INSERT INTO User (
        new_asset,
        new_liability,
        date_test,
        date_added
      ) VALUES (
        @newAsset,
        @newLiability,
        @dateTest,
        NOW()
      )
    `, {
      newAsset: body.newAsset,
      newLiability: body.newLiability,
      dateTest: body.date,
    })
    res.end('Added Assets & Liabilities');
  })

  // This doesnt work right now
  // .post('/api', async (req, res) => {
  //   const body = req.body;

  //   await database.execute(`

  //     INSERT INTO nwamounts (
  //       item_name,
  //       date,
  //       item_amount,
  //       date_added
  //     ) VALUES (
  //       @itemName,
  //       @date,
  //       @itemAmount,
  //       NOW()
  //     )
  //   `, {
  //     itemName: body.cID,
  //     date: body.date,
  //     itemAmount: body.itemBalance,
  //   })
  //   res.end('Added Assets & Liabilities');
  // })


  .listen(port, () => console.log(`Server listening on port ${port}`));