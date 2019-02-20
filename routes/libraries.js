const express = require('express');
// const createError = require('http-errors');
const asyncMiddleware = require('../middleware/asyncHandler');
const Library = require('../models/Library');

const router = express.Router();

const randValue = () => Math.round(Math.random() * 100) / 100;

router.get(
  '/',
  asyncMiddleware(async (req, res) => {
    const results = await Library.find({});
    console.log(JSON.stringify(results));

    const libraries = {};

    results.forEach((lib) => {
      libraries[lib.name] = {
        overallCapacity: randValue(),
        floorCapacities: {
          s1: randValue(),
          s2: randValue(),
          s3: randValue(),
        },
      };
    });

    res.send(libraries);
  }),
);

module.exports = router;
