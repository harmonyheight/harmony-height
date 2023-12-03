require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes');
const { connectToMongoDB } = require('./src/utils/db');
const app = express();
// const path = require('path');
app.use(bodyParser.raw({ type: 'application/json' }));
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// middleware that can be used to enable CORS with various options.
// app.use(
//   '/public/uploads',
//   express.static(path.join(__dirname, 'public/uploads')),
// );
app.use('/uploads', express.static('uploads'));
const allowedOrigins = [
  'http://harmonyheightsresidences.com',
  'http://localhost:3000',
  'http://195.35.8.116',
];
app.use(cors({ origin: allowedOrigins }));
app.get('/api', (req, res) => {
  res.send('<h1>Harmony Height Server is up and running</h1>');
});
app.use('/api', routes.authenticationRoutes);
app.use('/api', routes.propertyListingRoutes);
app.use('/api', routes.homeRoutes);
app.use('/api', routes.buyRoutes);
app.use('/api', routes.rentRoutes);
app.use('/api', routes.stripeRoutes);

connectToMongoDB().then(() =>
  app.listen(process.env.PORT, () =>
    console.log(
      `Harmony Height backend app is listening on port ${process.env.PORT}`,
    ),
  ),
);
