const mongoose = require('../db');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

// 注册前自动加密
userSchema.pre('save', function (next) {
  const user = this;
  console.log(user, 'user')
  if (!user.isModified('password')) return next();
  user.password = bcrypt.hashSync(user.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);

