const asyncHandler = require('express-async-handler');
const {
  dbGetRides,
  dbGetRide,
  dbGetTrain,
  dbGetStation,
  dbChangeTrain,
  dbChangeStation,
  dbDeleteRide,
  dbDeleteTrain,
  dbDeleteStation,
  dbAddRide,
  dbAddStation,
  dbAddTrain,
} = require('../model');

const getRides = asyncHandler(async (req, res) => {
  const { code, data } = await dbGetRides();
  res.status(code).json(data);
});

const changeTrain = asyncHandler(async (req, res) => {
  const { name } = req.params;
  const { train } = req.body;
  if (!name || !train) {
    res
      .status(400)
      .send('One or more properties missing: name, accessibility, seats, desc');
    return;
  }
  const { code, data } = await dbChangeTrain(name, train);
  res.status(code).json(data);
});
const changeStation = asyncHandler(async (req, res) => {
  const { abbr } = req.params;
  const { station } = req.body;
  if (!abbr || !station) {
    res.status(400).send('One or more properties missing: abbr, station');
    return;
  }
  const { code, data } = await dbChangeStation(abbr, station);
  res.status(code).json(data);
});

const deleteRide = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const rows = dbGetRide(id);
  if (rows.length === 0) {
    res.status(404).send(`Ride ${id} does not exist`);
    return;
  } else {
    await dbDeleteRide(id);
    res.status(204).end();
  }
});
const deleteTrain = asyncHandler(async (req, res) => {
  const { name } = req.params;
  const rows = dbGetTrain(name);
  if (rows.length === 0) {
    res.status(404).send(`Train ${name} does not exist`);
    return;
  } else {
    await dbDeleteTrain(name);
    res.status(204).end();
  }
});
const deleteStation = asyncHandler(async (req, res) => {
  const { abbr } = req.params;
  const rows = dbGetStation(abbr);
  if (rows.length === 0) {
    res.status(404).send(`Station ${abbr} does not exist`);
    return;
  } else {
    await dbDeleteStation(abbr);
    res.status(204).end();
  }
});

const addRide = asyncHandler(async (req, res) => {
  const { code, data } = await dbAddRide(req.body);
  res.status(code).json(data);
});
const addStation = asyncHandler(async (req, res) => {
  const { code, data } = await dbAddStation(req.body);
  res.status(code).json(data);
});
const addTrain = asyncHandler(async (req, res) => {
  const { code, data } = await dbAddTrain(req.body);
  res.status(code).json(data);
});

module.exports = {
  getRides,
  changeTrain,
  changeStation,
  deleteRide,
  deleteTrain,
  deleteStation,
  addRide,
  addStation,
  addTrain,
};
