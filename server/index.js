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
io.on('connection', socket => {
  console.log('a user connected..');
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
// set static folder
app.use(staticMiddleware);

// server.listen(process.env.PORT, () => {
//   // eslint-disable-next-line no-console
//   console.log(`express server listening on port ${process.env.PORT}`);

server.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('express server listening on port 3001');
});
