const mongoose = require('mongoose');

var mongoURL = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.a8imc.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var db = mongoose.connection;

db.on('connected', () => {
  console.log('Mongo DB Connection Successfull');
});

db.on('error', () => {
  console.log(`Mongo DB Connection failed`);
});

module.exports = mongoose;
