const express = require('express');
// const createError = require('http-errors');
const asyncMiddleware = require('../middleware/asyncHandler');
const { APCount, MaximumAPCount } = require('../models/APCount');
const capacityAvg = require('../models/capacityAvg');
const cache = require('../helpers/cache');
const Library = require('../models/Library');

const router = express.Router();

router.get(
  '/',
  asyncMiddleware(async (req, res) => {
    let libraries = await cache.get('libraries');

    // if libraries are already in the cache send them
    // and exit early
    if (libraries !== undefined) {
      res.send({ libraries });
      return;
    }

    // if library names are not in cache, fetch them from db
    const libraryDocs = await Library.find({});
    // remove the _id field from the library objects
    const sanitizedLibraries = libraryDocs.map(lib => ({ name: lib.name }));
    libraries = sanitizedLibraries;
    await cache.set('libraries', libraries);

    res.send({ libraries });
  }),
);

function computeCapacity(currCount, maxCount) {
  const currCapacity = (currCount / maxCount).toFixed(2);
  return Math.min(currCapacity, 1.0);
}

router.get(
  '/capacities',
  asyncMiddleware(async (req, res) => {
    let capacities = await cache.get('capacities');

    if (capacities !== undefined) {
      res.send(capacities);
      return;
    }

    const currentAPCountsPromise = APCount.find({})
      .sort({ timestamp: -1 })
      .limit(1);

    const maximumAPCountsPromise = MaximumAPCount.find({})
      .sort({ timestamp: -1 })
      .limit(1);

    const [currentResults, maxResults] = await Promise.all([
      currentAPCountsPromise,
      maximumAPCountsPromise,
    ]);

    const currentAPCounts = currentResults[0];
    const maxAPCounts = maxResults[0];

    const taylor = {
      total: computeCapacity(currentAPCounts.taylor.totalCount, maxAPCounts.taylor.totalCount),
      floors: currentAPCounts.taylor.floors.map((floor, index) => ({
        name: floor.name,
        capacity: computeCapacity(floor.count, maxAPCounts.taylor.floors[index].count),
      })),
    };

    const weldon = {
      total: computeCapacity(currentAPCounts.weldon.totalCount, maxAPCounts.weldon.totalCount),
      floors: currentAPCounts.weldon.floors.map((floor, index) => ({
        name: floor.name,
        capacity: computeCapacity(floor.count, maxAPCounts.weldon.floors[index].count),
      })),
    };

    capacities = {
      timestamp: currentAPCounts.timestamp,
      taylor,
      weldon,
    };

    await cache.set('capacities', capacities);

    res.send(capacities);
  }),
);

function getTimeSlot(date) {
  const hour = date.getHours();
  const min = date.getMinutes() - (date.getMinutes() % 15);
  return { index: hour * 4 + min / 15, time: `${hour}:${min}` };
}

router.get(
  '/averageCapacities',
  asyncMiddleware(async (req, res) => {
    const { time } = req.query;

    let date;
    if (time == null) {
      date = new Date();
    } else {
      date = new Date(time);
    }

    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const timeSlot = getTimeSlot(date);

    const day = weekday[date.getDay()];

    const avgCache = await cache.get(`capacity_${day}_${timeSlot.time}`);
    if (avgCache !== undefined) {
      res.send(avgCache);
      return;
    }

    const avgCapacitiesPromise = capacityAvg.find({ _id: day }).limit(1);

    const maximumAPCountsPromise = MaximumAPCount.find({})
      .sort({ timestamp: -1 })
      .limit(1);

    const [avgCapacities, maximumAPCounts] = await Promise.all([
      avgCapacitiesPromise,
      maximumAPCountsPromise,
    ]);

    const avgAPCounts = avgCapacities[0];
    const maxAPCounts = maximumAPCounts[0];

    const taylor = {
      total: computeCapacity(
        avgAPCounts.taylor.times[timeSlot.index].totalCount,
        maxAPCounts.taylor.totalCount,
      ),
      floors: avgAPCounts.taylor.times[timeSlot.index].floors.map((floor, index) => ({
        name: floor.name,
        capacity: computeCapacity(floor.count, maxAPCounts.taylor.floors[index].count),
      })),
    };

    const weldon = {
      total: computeCapacity(
        avgAPCounts.weldon.times[timeSlot.index].totalCount,
        maxAPCounts.weldon.totalCount,
      ),
      floors: avgAPCounts.weldon.times[timeSlot.index].floors.map((floor, index) => ({
        name: floor.name,
        capacity: computeCapacity(floor.count, maxAPCounts.weldon.floors[index].count),
      })),
    };

    const avgAPCountsPercentage = {
      time: timeSlot.time,
      taylor,
      weldon,
    };

    await cache.set(`capacity_${day}_${timeSlot.time}`, avgAPCountsPercentage);
    res.send(avgAPCountsPercentage);
  }),
);

module.exports = router;
