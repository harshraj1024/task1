const express = require('express');
const path = require('path'); // Import the path module if needed for views directory
const app = express();
const port = 5000;
const User = require('./models/User');

require('./mongo/conn');


// Set Handlebars as the view engine
app.set("view engine", "hbs");

// Define the views directory if needed
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('views'));

// Serve static files from the 'views/assets' directory
app.use('/assets', express.static(path.join(__dirname, 'views', 'assets')));

// Define a route
app.get('/', (req, res) => {
  res.render('form');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
