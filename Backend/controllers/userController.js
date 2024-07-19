const DiamSdk = require('diamante-sdk-js');
const axios = require('axios');
const User = require('../models/userModel');
const Funds = require('../models/fundModel');
const server = new DiamSdk.Horizon.Server('https://diamtestnet.diamcircle.io');

// List a new fundraising project
const listFund = async (req, res) => {
  try {
    const { title, description, totalFundAsked, images } = req.body;

    const fundraiserId = req.userId;
    const fund = new Funds({
      title,
      description,
      images,
      totalFundAsked,
      fundraiserId
    });

    const savedFund = await fund.save();

    const user = await User.findById(req.userId);
    user.my_listings.push({ listing: savedFund._id });
    await user.save();

    res.status(200).json({ result: fund, message: 'Fund listed successfully' });
  } catch (error) {
    console.error('Error listing new fund:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get user details
const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate('my_listings.listing')
      .populate('my_donations.listing');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ result: user, message: 'User details fetched successfully' });
  } catch (error) {
    console.error('Error getting user details:', error);
    res.status(500).json({ error: error.message });
  }
};

// Donate to a fundraising project
const donateToFund = async (req, res) => {
  try {
    const { fundId } = req.params;
    let { amount } = req.body;
    amount = Number(amount);

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Invalid donation amount' });
    }
    const fund = await Funds.findById(fundId);
    if (!fund) {
      return res.status(404).json({ error: 'Fund not found' });
    }

    fund.totalFundGot += amount;
    fund.donators.push({
      donorId: req.userId,
      amount,
      donated_at: new Date(),
    });
    if(fund.totalFundGot >= fund.totalFundAsked){
      fund.done = true;
    }
    await fund.save();

    const user = await User.findById(req.userId);
    user.my_donations.push({ listing: fundId, amount, donated_at: new Date() });
    await user.save();

    res.status(200).json({ result: fund, message: 'Donation successful' });
  } catch (error) {
    console.error('Error donating to fund:', error);
    res.status(500).json({ error: error.message });
  }
};

// Fund user's account with test DIAM
const fundAccountWithTestDiam = async (req, res) => {
  try {
    const publicKey = req.public_address;
    console.log(`Received request to fund account ${publicKey}`);
    const response = await axios.get(`${process.env.DIAM_FAUCET_URI}?addr=${publicKey}`);
    const result = response.data;
    console.log(`Account ${publicKey} activated`, result);
    res.json({ message: `Account ${publicKey} funded successfully` });
  } catch (error) {
    console.error('Error in fund-account:', error);
    res.status(500).json({ error: error.message });
  }
};

// Set account data on-chain
const setAccountDataOnChain = async (req, res) => {
  try {
    const { name, value } = req.body;
    const user = await User.findById(req.userId);
    const sourceKeys = DiamSdk.Keypair.fromSecret(user.secret_key);
    server
      .loadAccount(sourceKeys.publicKey())
      .then(function (sourceAccount) {
        transaction = new DiamSdk.TransactionBuilder(sourceAccount, {
          fee: DiamSdk.BASE_FEE,
          networkPassphrase: 'Diamante Testnet'
        })
          .addOperation(
            DiamSdk.Operation.manageData({
              name,
              value
            })
          )
          .setTimeout(0)
          .build();
        // Signing the transaction
        transaction.sign(sourceKeys);
        return server.submitTransaction(transaction);
      })
      .then(function (result) {
        return res.status(200).json({ message: 'Data set successfully' });
      })
      .catch(function (error) {
        return res.status(500).json({ error: error.message });
      });
    return server.submitTransaction(transaction);
  } catch (error) {
    console.error('Error setting account data on chain:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Create a token asset on-chain
const createTokenAssetOnChain = async (req, res) => {
  try {
    const { token_name, no_of_tokens } = req.body;
    const user = await User.findById(req.userId);
    const issuingKeys = DiamSdk.Keypair.fromSecret(user.secret_key);
    // Create a distributor account
    const distributorKeypair = DiamSdk.Keypair.random();
    user.distribution_address = distributorKeypair.publicKey();
    user.distribution_secret_key = distributorKeypair.secret();
    await user.save();
    const receivingKeys = DiamSdk.Keypair.fromSecret(distributorKeypair.secret());
    // Create an asset (token) on diamante chain
    const newAsset = new DiamSdk.Asset(token_name, issuingKeys.publicKey());

    // Create trustline between distributor and issuer account
    server
      .loadAccount(receivingKeys.publicKey())
      .then(function (receiver) {
        let transaction = new DiamSdk.TransactionBuilder(receiver, {
          fee: 100,
          networkPassphrase: DiamSdk.Networks.TESTNET
        })
          .addOperation(
            DiamSdk.Operation.changeTrust({
              asset: newAsset,
              limit: no_of_tokens
            })
          )
          .setTimeout(100)
          .build();
        transaction.sign(receivingKeys);
        return server.submitTransaction(transaction);
      })
      .then(console.log)

      // Send the money (new asset tokens) to the distributor from issuer account
      .then(function () {
        return server.loadAccount(issuingKeys.publicKey());
      })
      .then(function (issuer) {
        let transaction = new DiamSdk.TransactionBuilder(issuer, {
          fee: 100,
          networkPassphrase: DiamSdk.Networks.TESTNET
        })
          .addOperation(
            DiamSdk.Operation.payment({
              destination: receivingKeys.publicKey(),
              asset: newAsset,
              amount: no_of_tokens
            })
          )
          .setTimeout(100)
          .build();
        transaction.sign(issuingKeys);
        return server.submitTransaction(transaction);
      })
      .then(console.log)
      .catch(function (error) {
        console.error(
          'Error occured while tranfering asset to distributor!',
          error
        );
      });

    return res
      .status(200)
      .json({ result: newAsset, message: 'Asset created successfully' });
  } catch (error) {
    console.error('Error creating token asset on chain:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Make a payment
const makePayment = async (req, res) => {
  try {
    const { receiverPublicKey, amount } = req.body;
    const user = await User.findById(req.userId);
    const senderSecret = user.secret_key;
    const senderKeypair = DiamSdk.Keypair.fromSecret(senderSecret);
    const senderPublicKey = senderKeypair.publicKey();
    const account = await server.loadAccount(senderPublicKey);
    const transaction = new DiamSdk.TransactionBuilder(account, {
      fee: await server.fetchBaseFee(),
      networkPassphrase: Networks.TESTNET
    })
      .addOperation(
        Operation.payment({
          destination: receiverPublicKey,
          asset: Asset.native(),
          amount: amount
        })
      )
      .setTimeout(30)
      .build();

    transaction.sign(senderKeypair);
    const result = await server.submitTransaction(transaction);
    console.log(
      `Payment made from ${senderPublicKey} to ${receiverPublicKey} with amount ${amount}`,
      result
    );
    res.status(200).json({
      message: `Payment of ${amount} DIAM made to ${receiverPublicKey} successfully`
    });
  } catch (error) {
    console.error('Error in making payment:', error);
    res.status(500).json({ error: error.message });
  }
};

const sendAssetToken = async (req, res) => {};

module.exports = {
  listFund,
  getUserDetails,
  donateToFund,
  fundAccountWithTestDiam,
  setAccountDataOnChain,
  createTokenAssetOnChain,
  makePayment
};
