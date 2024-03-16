// const express = require('express')
// const router = express.Router();
// readUsers.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ users: req.users });
});

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  const user = req.users.find(user => user.id === userId);
  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

module.exports = router;
