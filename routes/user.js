const bcrypt = require('bcrypt')
const _ = require('lodash')
const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();

router.post(('/'), async (req, res) => {
  const { error } = validate(req.body)
  if (error) res.status(400).send(error.details[0].message)

  let user = await User.findOne({ email: req.body.email })
  if (user) return res.status(400).send('Email already exists')

  user = new User( _.pick(req.body, ['name', 'email', 'password', 'isAdmin']) )
  const salt  = await bcrypt.genSalt(6)
  user.password = await bcrypt.hash(user.password, salt)
  
  await user.save()
  let details = _.pick(user, ['name', 'email', 'isAdmin', '_id'])
  
  const token = user.generateAuthToken()
  res.header('x-auth-header', token).send(details)

});
    module.exports = router
    