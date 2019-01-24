const express = require('express');
// const createError = require('http-errors');
const asyncMiddleware = require('../middleware/asyncHandler');

const router = express.Router();

const randValue = () => Math.round(Math.random() * 100) / 100;

router.get(
  '/',
  asyncMiddleware(async (req, res) => {
    const libraries = {
      'Taylor Library': {
        overallCapacity: randValue(),
        floorCapacities: {
          s1: randValue(),
          s2: randValue(),
          s3: randValue(),
        },
      },
      'Weldon Library': {
        overallCapacity: randValue(),
        floorCapacities: {
          s1: randValue(),
          s2: randValue(),
          s3: randValue(),
        },
      },
    };

    res.send(libraries);
  }),
);

module.exports = router;
