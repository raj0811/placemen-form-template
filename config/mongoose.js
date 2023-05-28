const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/demobulk', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb+srv://mrunknown0086:YNIhPrH9MqUOI6rL@cluster0.fhedmh1.mongodb.net/?retryWrites=true&w=majority')


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to the database'));

db.once('open', function() {
  console.log('Successfully connected to the database');
});


module.exports = db;