const Order = require('../models/Order');
const Listings = require('../models/Listings');
const Customer = require('../models/Customer');

const getAllSoldListingOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const options = {
      page,
      limit: pageSize,
      sort: { createdAt: 'desc' }, // Sort by createdAt in descending order
    };

    const query = { seller: req.customerId };

    const orders = await Order.paginate(query, options);

    const populatedOrders = await Order.populate(orders.docs, [
      { path: 'seller', model: Customer },
      { path: 'buyer', model: Customer },
      { path: 'listing', model: Listings },
    ]);
    // Assign the populated orders back to the original paginated results
    orders.docs = populatedOrders;

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getAllSoldListingOrders,
};
