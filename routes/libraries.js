const express = require('express');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
router.get('/capacity/:libraryName', (req, res, next) => {
  res.send({ message: 'Hello world' });
});

module.exports = router;
