const isAuth = (req, res, next) => {
  if (!req.user.googleId) {
    const err = new Error('No privileges')
    err.status = 401
    return next(err)
  }
  next()
}

module.exports = isAuth
