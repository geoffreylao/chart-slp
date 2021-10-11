require('dotenv').config();

module.exports = {
  url: process.env.URL || 'mongodb://127.0.0.1:27017/mongoslp'
}
