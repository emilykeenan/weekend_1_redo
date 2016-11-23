var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/weekend5';

router.get('/', function(req, res) {
  console.log('reached get route!')
  // get customers from DB
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SELECT * FROM employees ORDER BY last_name;',
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
});

router.put('/:id', function(req, res) {
  console.log(req.body);
  employeeID = req.params.id;
  employee = req.body;
  employeeStatus = req.body.status;
  console.log('employee to update ', employeeStatus);

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'UPDATE employees SET status=$1 ' +
      'WHERE id=$2',
      // array of values to use in the query above
      [employee.status, employeeID],
      function(err, result) {
        done();
        if(err) {
          console.log('update error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    }); // close connect

}); // end route

module.exports = router;
