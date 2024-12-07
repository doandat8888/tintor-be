const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true, maxlength: 50, lowercase: true },
  password: { type: String, required: true },
  fullName: { type: String, required: false, maxlength: 50 },
  role: { type: String, default: 'user' },
  employeeNumber: { type: String, required: false },
  dateOfBirth: { type: String, required: false },
  department: { type: String, required: false },
  skills: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  avatar: { type: String, required: false },
  learningGoals: { type: String, required: false },
  isActive: { type: Boolean, require: false, default: true },
  isFirstLogin: { type: Boolean, require: false }
});

//Check presave user
UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(this.password, salt);
    this.password = hashpassword;
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isCheckPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoose.model("User", UserSchema);
