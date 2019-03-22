const express = require('express');
// const createError = require('http-errors');
const asyncMiddleware = require('../middleware/asyncHandler');
const APCount = require('../models/APCount');
const Library = require('../models/Library');

const router = express.Router();

router.get(
  '/',
  asyncMiddleware(async (req, res) => {
    const libraries = await Library.find({});

    // remove the _id field from the library objects
    const sanitizedLibraries = libraries.map(lib => ({ name: lib.name }));

    res.send({ libraries: sanitizedLibraries });
  }),
);

router.get(
  '/capacities',
  asyncMiddleware(async (req, res) => {
    const apCounts = await APCount.find({})
      .sort({ timestamp: -1 })
      .limit(1);

    console.log(apCounts);

    res.send({});
  }),
);

module.exports = router;
