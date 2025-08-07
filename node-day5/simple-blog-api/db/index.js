const mongoose = require('mongoose') 



mongoose.connect('mongodb://127.0.0.1:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB 连接错误:'));
db.once('open', () => {
  console.log('✅ MongoDB 连接成功');
});

module.exports = mongoose;