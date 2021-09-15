'use strict';

const auth = require('basic-auth');
const bcrypt = require('bcrypt');
const { sequelize } = require('../models');
var initModels = require("../models/init-models").initModels; 

/**
 * Middleware to authenticate the request using Basic Authentication.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @param {Function} next - The function to call to pass execution to the next middleware.
 */
exports.authenticateUser = async (req, res, next) => {
  let message;
  let models = initModels(sequelize);
  let User = models.user;


  const credentials = auth(req);

  if (credentials) {
    const user = await User.findOne({
      where: {
        emailAddress: credentials.name
      }
    });
    if (user) {
      const authenticated = bcrypt.compareSync(credentials.pass, user.password);
      if (authenticated) {
        console.log(`Authentication successful for username: ${user.emailAddress}`);

        // Store the user on the Request object.
        req.currentUser = user;
      } else {
        message = `Authentication failure for username: ${user.username}`;
      }
    } else {
      message = `User not found for username: ${credentials.name}`;
    }
  } else {
    message = 'Auth header not found.';
  }

  if (message) {
    console.warn(message);
    res.status(401).json({
      message: 'Access Denied.'
    });
  } else {
    next();
  }
};