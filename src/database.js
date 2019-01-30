const mongoose = require('mongoose');

const URI = 'mongodb://localhost/mern-tasks';

const config = {
  useNewUrlParser: true,
};

mongoose
  .connect(
    URI,
    config,
  )
  .then(db => console.log('DB is connected'))
  .catch(err => console.log(err));

module.exports = mongoose;
