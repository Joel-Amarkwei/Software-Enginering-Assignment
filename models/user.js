const jwt = require('jsonwebtoken')
const config = require('config')
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
  },
  password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
  },
  // to include more password complexity you can npm install joi-password-complexity and use it, read
  isAdmin: { type: Boolean }
})

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, isAdmin: this. isAdmin }, config.get("jwtPrivateKey"))
  return token
}

const User = mongoose.model('User', userSchema)

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
    isAdmin: Joi.boolean()
  };
  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;