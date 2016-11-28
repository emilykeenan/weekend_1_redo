var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/weekend5';

// route to get budgets from databse
router.get('/', function(req, res) {
  console.log('reached get route!')
  // get budgets from DB
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SELECT * FROM salary_budgets ORDER BY id DESC',
    function(err, result) {
      done(); // close the connection.

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      // console.log(result.rows);
      res.send(result.rows);

    });

  });
}); // end get request

// route to add new budget from database
router.post('/', function(req, res) {
  var newBudget = req.body;
  console.log(newBudget);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'INSERT INTO salary_budgets (month, year, budget) ' +
      'VALUES ($1, $2, $3)',
      [newBudget.month, newBudget.year, newBudget.budget],
      function(err, result) {
        done();

        if(err) {
          console.log('insert query error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });

  });

});

module.exports = router;
