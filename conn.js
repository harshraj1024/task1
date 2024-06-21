  const mongoose = require('mongoose');
    const mongoURI = 'mongodb://localhost:27017/GFG';
    
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Error connecting to MongoDB', err));
    