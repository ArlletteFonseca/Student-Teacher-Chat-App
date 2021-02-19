/* eslint-disable no-console */
require('dotenv/config');

const staticMiddleware = require('./static-middleware');

const pg = require('pg');
const db = new pg.Pool({
  connectionString: 'postgres://dev:lfz@localhost/school'
});

const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(express.json());

//  Run when client connects
io.on('connection', socket => {
  // Broadcast when a user connects
  // socket.broadcast.emit('message', 'A user has joined the chat');
  // Runs when client disconnects
  socket.on('disconnect', () => {
    // io.emit('message', 'A user has left the chat');
  });

  // prints out Chat message event
  socket.on('chat message', msg => {
    console.log(msg);
    io.emit('message', msg);
  });

});

// getting database
app.get('/api/student/', (req, res, next) => {
  const sql = `SELECT *
                   FROM "student"`;
  db.query(sql)
    .then(result => {
      const student = result.rows;
      if (student.length > 0) {
        res.status(200).json(student);
      } else {
        res.status(404).json([]);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occured, cannot query database'
      });
    });
});

// Get messages
app.get('/api/messages/', (req, res, next) => {
  const sql = `SELECT *
                   FROM "messages"`;
  db.query(sql)
    .then(result => {
      const message = result.rows;
      if (message.length > 0) {
        res.status(200).json(message);
      } else {
        res.status(404).json([]);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occured, cannot query database'
      });
    });
});

app.get('/api/messages/:teacherID/:studentID', (req, res, next) => {
  console.log(req);
  // const sql = `SELECT *
  //                  FROM "messages" as m
  //                  join "students" as s using ("studentID")
  //                  where "m"."studentID" = $1 and "m"."teacherID" = $2`;
  // const ID = [req.params.studentID, req.params.teacherID];
  // db.query(sql, ID)
  //   .then(result => {
  //     const message = result.rows;
  //     if (message.length > 0) {
  //       res.status(200).json(message);
  //     } else {
  //       res.status(404).json([]);
  //     }
  //   })
  //   .catch(err => {
  //     console.error(err);
  //     res.status(500).json({
  //       error: 'An unexpected error occured, cannot query database'
  //     });
  //   });
});

// posting messages
app.post('/api/messages/', (req, res, next) => {

  const text = `INSERT INTO "messages" (message)
                    VALUES($1)`;
  const values = [req.body.message];
  db.query(text, values)
    .then(result => {
      const message = result.rows;
      if (values) {
        res.status(201).json(message);
      } else {
        res.status(500).json({
          error: 'query has failed'
        });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occured api'
      });
    });
});

// set static folder
app.use(staticMiddleware);

server.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('express server listening on port 3001');
});
