const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  public_address: { type: String, required: true, unique: true },
  secret_key: { type: String, required: true },
  my_listings: [
    { listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Funds' } }
  ],
  my_donations: [
    {
      listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Funds' },
      amount: { type: Number, required: true },
      donated_at: { type: Date, default: Date.now }
    }
  ],
  created_at: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
