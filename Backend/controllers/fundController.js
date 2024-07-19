const Fund = require('../models/fundModel');
const User = require('../models/userModel');

// Get all fundraisers
const getAllFunds = async (req, res) => {
  try {
    const funds = await Fund.find()
      .populate('fundraiserId')
      .populate('donators.donorId'); 
    res.status(200).json({
      result: funds,
      message: 'All fundraisers fetched successfully'
    });
  } catch (error) {
    console.error('Error getting all fundraisers:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get a single fundraiser by ID
const getSingleFund = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Fundraiser ID is required' });
    }
    const fund = await Fund.findById(id)
      .populate('fundraiserId') 
      .populate('donators.donorId');
    if (!fund) {
      return res.status(404).json({ error: 'Fundraiser not found' });
    }

    res.status(200).json({
      result: fund,
      message: 'Fundraiser fetched successfully'
    });
  } catch (error) {
    console.error('Error getting fundraiser:', error);
    res.status(500).json({ error: 'An error occurred while fetching the fundraiser' });
  }
};

// Search for fundraisers
const searchFunds = async (req, res) => {
  try {
    const { q } = req.query;
    const funds = await Fund.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ]
    });
    return res.status(200).json({
      result: funds,
      message: 'Search results fetched successfully'
    });
  } catch (error) {
    console.error('Error searching fundraisers:', error);
    res.status(500).json({ error: error.message });
  }
};

// Create a new fundraiser
const createFund = async (req, res) => {
  try {
    const { title, description, images, totalFundAsked } = req.body;
    const fundraiser = req.userId;

    const newFund = new Fund({
      title,
      description,
      images,
      totalFundAsked,
      fundraiser,
      created_at: Date.now()
    });

    const savedFund = await newFund.save();

    const user = await User.findById(req.userId);
    user.my_listings.push({ listing: savedFund._id });
    await user.save();

    res.status(200).json({ result: savedFund, message: 'Fundraiser created successfully' });
  } catch (error) {
    console.error('Error creating fundraiser:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllFunds, getSingleFund, searchFunds, createFund };
