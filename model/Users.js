const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    minlength: 3,
    required: [true, 'a name is required']
  },
  email: {
    type: String,
    required: [true, 'a user must have an email'],
    unique: true,
    lower: true,
    validate: [validator.isEmail, 'invalid email']
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, 'password is required'],
    select: false
  },
  confirmPassword: {
    type: String,
    required: [true, 'please confirm your password'],
    validate: {
      validator: function(val) {
        return this.password === val;
      },
      message: 'password do not match'
    }
  },
  role: {
    type: String,
    required: [true, 'please tell us your role']
  },
  experience: {
    type: String,
    enum: ['expert', 'newbie', 'intermediate']
  },
  bio: {
    type: String,
    required: [true, 'your bio is required']
  },
  image: {
    type: String,
    default: '/img/users/default.jpg'
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

UserSchema.methods.comparePassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Users = mongoose.model('Users', UserSchema);
module.exports = Users;
