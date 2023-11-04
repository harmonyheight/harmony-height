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

module.exports = {
  popularListing,
};
