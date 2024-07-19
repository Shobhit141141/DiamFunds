const express = require('express');
const {
  getUserDetails,
  fundAccountWithTestDiam,
  setAccountDataOnChain,
  createTokenAssetOnChain,
  makePayment,
  listFund,
  donateToFund
} = require('../controllers/userController');
const userRouter = express.Router();

userRouter
  .post('/list-fund-raiser', listFund)
  .get('/details', getUserDetails)
  .post('/donate/:fundId', donateToFund)
  .get('/fund-account', fundAccountWithTestDiam)
  .post('/set-data', setAccountDataOnChain)
  .post('/create-asset', createTokenAssetOnChain)
  .post('/make-payment', makePayment);

module.exports = userRouter;
