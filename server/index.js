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

// getting student database
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

// getting teacher database
app.get('/api/teacher/', (req, res, next) => {
  const sql = `SELECT *
                   FROM "teacher"`;
  db.query(sql)
    .then(result => {
      const teacher = result.rows;
      if (teacher.length > 0) {
        res.status(200).json(teacher);
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
  const sql = `SELECT "m"."message", "s"."studentID","s"."firstName", "t"."teacherID","t"."lastName", "t"."firstName"
                   FROM "messages" as "m"
                   join "student" as "s" using ("studentID")
                   join "teacher" as "t" using ("teacherID")
                   Where "m"."studentID" = 3 and "m"."teacherID" = 2
                   `;
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

// posting messages
app.post('/api/messages/', (req, res, next) => {

  const text = `INSERT INTO "messages" ("message", "teacherID", "studentID")
                    VALUES($1, $2, $3)`;
  const values = [req.body.message, req.body.teacherID, req.body.studentID];
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
