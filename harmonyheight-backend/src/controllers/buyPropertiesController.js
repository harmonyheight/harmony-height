const Listings = require('../models/Listings');

const popularListing = async (req, res) => {
  try {
    const recentListings = await Listings.find({ type: 'Sell' })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email')
      .exec();
    if (recentListings.length > 0) {
      return res
        .status(200)
        .json({ message: 'latest listing fetched', listings: recentListings });
    }
    return res.status(404).json({
      error: 'No recent listing found',
      listings: [],
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const latestListing = async (req, res) => {
  try {
    // Calculate the date one week ago from the current date
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Use Mongoose to find listings created within the last week
    const recentListings = await Listings.find({
      createdAt: { $gte: oneWeekAgo },
      type: 'Sell',
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email')
      .exec();
    if (recentListings.length > 0) {
      return res.status(200).json({
        message: 'latest selling listing fetched',
        listings: recentListings,
      });
    }
    return res.status(404).json({
      error: 'No recent listing found',
      listings: [],
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getPropertyById = async (req, res) => {
  const id = req.params.id;
  try {
    const property = await Listings.findById(id).populate('user', 'name email');

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.status(200).json({ property, message: 'Proper fetch successfully' });
  } catch (error) {
    console.error('Error getting property by ID:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  popularListing,
  latestListing,
  getPropertyById,
};
