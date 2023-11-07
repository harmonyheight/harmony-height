const Listings = require('../models/Listings');

const buyfilteredListing = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    // Define the filter for the query
    const filter = {
      type: 'Sell',
    };
    console.log('====================================');
    console.log(req.query.minPrice, req.query.maxPrice);
    console.log('====================================');
    // Check if minPrice and maxPrice query parameters are provided
    if (req.query.minPrice && req.query.maxPrice) {
      // Add price range conditions to the filter
      filter.price = {
        $gte: parseInt(req.query.minPrice),
        $lte: parseInt(req.query.maxPrice),
      };
    }
    console.log('====================================');
    console.log(filter);
    console.log('====================================');
    // Create a promise to retrieve listings with pagination
    const listingsPromise = Listings.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('user', 'name email')
      .exec();

    // Create a promise to count the total number of listings
    const totalListingsCountPromise = Listings.countDocuments(filter);

    // Execute both promises concurrently
    const [listings, totalListingsCount] = await Promise.all([
      listingsPromise,
      totalListingsCountPromise,
    ]);

    if (listings.length > 0) {
      return res.json({
        message: 'Listings found',
        listings: {
          listings,
          currentPage: page,
          totalPages: Math.ceil(totalListingsCount / limit),
          totalListings: totalListingsCount,
        },
      });
    }

    return res.status(404).json({
      error: 'Listings not found',
      listings: {
        listings,
        currentPage: page,
        totalPages: Math.ceil(totalListingsCount / limit),
        totalListings: totalListingsCount,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  buyfilteredListing,
};
