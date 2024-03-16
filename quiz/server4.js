// server4.js
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;

const readUsers = require('./readUsers');
const writeUsers = require('./writeUsers');

let users;
fs.readFile(path.resolve(__dirname, '../data/users.json'), (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  users = JSON.parse(data);
});

const addMsgToRequest = (req, res, next) => {
  if (users) {
    req.users = users;
    next();
  } else {
    res.status(404).json({ error: { message: 'Users not found', status: 404 } });
  }
};

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(addMsgToRequest);

app.use('/read', readUsers);
app.use('/write', writeUsers);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
