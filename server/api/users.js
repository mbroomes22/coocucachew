const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// look into securing your routes with middleware

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// /api/users/:userId --> admins and the logged in user who matches that userId in the api request
