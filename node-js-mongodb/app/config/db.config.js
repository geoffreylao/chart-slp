require('dotenv').config();

module.exports = {
  url: process.env.URL || 'mongodb://127.0.0.1:27017/mongoslp'
}

// db speed test

// atlas
// my records - 4.74s
// kyles records - 1.37 min

// localhost
// my records - 1.85s
// kyles records - 11.58s
