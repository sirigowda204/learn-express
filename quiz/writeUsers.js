// const express = require('express')
// const fs = require('fs');
// const path = require('path');
// const router = express.Router()

// writeUsers.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.post('/', (req, res) => {
  const newUser = req.body;
  req.users.push(newUser);
  fs.writeFile(path.resolve(__dirname, '../data/users.json'), JSON.stringify(req.users, null, 2), (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to write user data' });
    } else {
      res.json({ message: 'User added successfully' });
    }
  });
});

module.exports = router;
