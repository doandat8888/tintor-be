const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, maxlength: 50 },
  password: { type: String, required: true },
  fullName: { type: String, required: false, maxlength: 50 },
  role: { type: String, default: 'user' },
  employeeNumber: { type: String, required: false, unique: true },
  dateOfBirth: { type: String, required: false },
  department: { type: String, required: false },
  skills: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  avatar: { type: String, required: false },
  learningGoals: { type: String, required: false },
  isActive: { type: Boolean, require: false, default: true }
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
