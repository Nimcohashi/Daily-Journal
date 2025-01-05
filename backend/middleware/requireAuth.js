const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

/**
 * Middleware to require authentication for routes.
 * Verifies the JWT token and attaches the user to the request object.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({err: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]

  try {
    // Verify the token and extract the user ID
    const { _id } = jwt.verify(token, process.env.JWT_SECRET)

    // Find the user by ID and attach to the request object
    req.user = await User.findOne({ _id }).select('_id')
    next()

  } catch (err) {
    console.log(err)
    res.status(401).json({err: 'Request is not authorized'})
  }
}

module.exports = requireAuth