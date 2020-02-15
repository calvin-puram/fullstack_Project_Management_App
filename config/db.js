const mongoose = require('mongoose');

const DB = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`connected to db `);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDB;
