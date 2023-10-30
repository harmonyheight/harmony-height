const Listings = require('../models/Listings');
const mongoose = require('mongoose');
const userCountListingsByType = async (req, res) => {
  try {
    const result = await Listings.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.customerId), // Convert user ID to ObjectId
        },
      },
      {
        $group: {
          _id: null,
          user: { $first: '$user' },
          totalRentType: {
            $sum: {
              $cond: [{ $eq: ['$type', 'rent'] }, 1, 0],
            },
          },
          totalSellType: {
            $sum: {
              $cond: [{ $eq: ['$type', 'Sell'] }, 1, 0],
            },
          },
        },
      },
    ]);
    if (result.length > 0) {
      const { user, totalRentType, totalSellType } = result[0];
      res.status(200).json({
        message: 'Analytics successfully retrieved',
        typeCount: {
          totalRentType,
          totalSellType,
        },
      });
    } else {
      res
        .status(404)
        .json({ error: 'No listings found for the specified user' });
    }
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    res.status(500).json({ error: 'Server error' });
  }
};

const countListingsByMonth = async (req, res) => {
  try {
    // Create an array of month names
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    // Create an array to store data for each month
    const data = [];

    // Get the current year
    const currentYear = new Date().getFullYear();

    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const startOfMonth = new Date(currentYear, monthIndex, 1);
      const endOfMonth = new Date(currentYear, monthIndex + 1, 0);

      // Use aggregation to count "forSale" and "forRent" listings for each month
      const pipeline = [
        {
          $match: {
            user: new mongoose.Types.ObjectId(req.customerId), // Convert user ID to ObjectId
            createdAt: { $gte: startOfMonth, $lte: endOfMonth },
            type: { $in: ['Sell', 'rent'] }, // Filter by both types
          },
        },
        {
          $group: {
            _id: '$type',
            count: { $sum: 1 },
          },
        },
      ];

      const counts = await Listings.aggregate(pipeline);

      // Initialize counts for "forSale" and "forRent"
      let forSaleCount = 0;
      let forRentCount = 0;

      // Update counts based on aggregation results
      counts.forEach((count) => {
        if (count._id === 'Sell') {
          forSaleCount = count.count;
        } else if (count._id === 'rent') {
          forRentCount = count.count;
        }
      });

      data.push({
        month: months[monthIndex],
        forSale: forSaleCount,
        forRent: forRentCount,
      });
    }

    res.status(200).json({
      message: 'Barchart data successfully retrieved',
      countsArray: data,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { userCountListingsByType, countListingsByMonth };
