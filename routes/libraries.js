const express = require('express');
const createError = require('http-errors');
const asyncMiddleware = require('../middleware/asyncHandler');

const router = express.Router();

// Temp Hardcoded. Should be fetched from DB or soemthing
const LIBRARIES = ['taylor', 'weldon'];

router.get(
  '/',
  asyncMiddleware(async (req, res) => {
    res.send({ libraries: LIBRARIES });
  }),
);

router.get(
  '/:libraryName',
  asyncMiddleware(async (req, res) => {
    const { libraryName } = req.params;

    if (!LIBRARIES.includes(libraryName.toLowerCase())) {
      throw createError.NotFound();
    }

    res.send({ name: libraryName, capacity: 80 });
  }),
);

module.exports = router;
