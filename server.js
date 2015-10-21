var pg = require('pg');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require ('body-parser');
var conString = "postgres://postgres:discos@localhost/postgres";

app.use(express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function(req, res){
  console.log('GET requested');
});

app.post('/', function(req, res) {
  console.log('POST requested');

  // get a pg client from the connection pool
  pg.connect(conString, function(err, client, done) {

    var handleError = function(err) {
      // no error occurred, continue with the request
      if(!err) return false;

      // An error occurred, remove the client from the connection pool.
      // A truthy value passed to done will remove the connection from the pool
      // instead of simply returning it to be reused.
      // In this case, if we have successfully received a client (truthy)
      // then it will be removed from the pool.
      if(client){
        done(client);
      }
      res.writeHead(500, {'content-type': 'text/plain'});
      res.end('An error occurred');
      return true;
    };

    // handle an error from the connection
    if(handleError(err)) return;

    console.log(JSON.stringify(req.body.name) + ' ' + JSON.stringify(req.body.comment));

    client.query('INSERT INTO comments (name, comment) VALUES ($1, $2)', [JSON.stringify(req.body.name), JSON.stringify(req.body.comment)], function(err, result) {

      // handle an error from the query
      if(handleError(err)) return;

      // get the total number of visits today (including the current visit)
      client.query('SELECT COUNT(name) AS count FROM comments', function(err, result) {

        // handle an error from the query
        if(handleError(err)) return;

        // return the client to the connection pool for other requests to reuse
        done();
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end('There are ' + result.rows[0].count + ' comments posted.');
      });
    });

  });

});
app.listen(3000);
console.log('Web server listening at http://localhost:3000');
