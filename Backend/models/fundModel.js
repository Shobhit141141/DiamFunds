// models/Listing.js

const mongoose = require('mongoose');

const FundModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  totalFundAsked: {
    type: Number,
    required: true,
  },
  totalFundGot: {
    type: Number,
    default: 0,
  },
  donators: [
    {
      donorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      donated_at: {
        type: Date,
      },
    },
  ],
  listed_at: {
    type: Date,
    default: Date.now,
  },
  done: {
    type: Boolean,
    default: false,
  },
  fundraiserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  public_address: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Funds', FundModel);
