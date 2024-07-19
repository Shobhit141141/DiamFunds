const express = require('express');

const { getAllFunds, getSingleFund, searchFunds } = require('../controllers/fundController');

const propertyRouter = express.Router();

propertyRouter
  .get('/get-all', getAllFunds) 
  .get('/get/:id', getSingleFund)
  .get('/search', searchFunds);

module.exports = propertyRouter;
