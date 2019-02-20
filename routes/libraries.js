const express = require('express');
// const createError = require('http-errors');
const asyncMiddleware = require('../middleware/asyncHandler');
const Library = require('../models/Library');

const router = express.Router();

const randValue = () => Math.round(Math.random() * 100) / 100;

router.get(
  '/',
  asyncMiddleware(async (req, res) => {
    // get list of all libraries
    const results = await Library.find({});

    const libraries = {};

    results.forEach((lib) => {
      const floors = lib.floors;

      const floorCapacities = {};

      floors.forEach((floor) => {
        floorCapacities[floor.name] = randValue();
      });

      libraries[lib.name] = {
        floors: lib.floors.map(floor => floor.name),
        overallCapacity: randValue(),
        floorCapacities,
      };
    });

    res.send(libraries);
  }),
);

module.exports = router;
