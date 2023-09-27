require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes');
const { connectToMongoDB } = require('./src/utils/db');
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// middleware that can be used to enable CORS with various options.
app.use(cors());
app.get('/', (req, res) => {
  res.send('<h1>Harmony Height Server is up and running</h1>');
});
app.use('/api', routes.authenticationRoutes);

connectToMongoDB().then(() =>
  app.listen(process.env.PORT, () =>
    console.log(
      `Harmony Height backend app is listening on port ${process.env.PORT}`,
    ),
  ),
);
