const {db} = require('./server/db')
const User = require('./server/db/models/user')
const Product = require('./server/db/models/product')
const OrderProduct = require('./server/db/models/orderproduct')

const seed = async () => {
  try {
    await db.sync({force: true})

    const snickerDoodle = await Product.create({
      name: 'snickerDoodle',
      type: 'cookie',
      image:
        'https://www.foxandbriar.com/wp-content/uploads/2019/09/Snickerdoodles-12-of-12.jpg',
      price: 0.0,
      description:
        'Sweet, soft, cinnamony...uhm, how do you describe perfection?'
    })

    const thinMint = await Product.create({
      name: 'thinMint',
      type: 'cookie',
      image:
        'https://www.clipartkey.com/mpngs/m/62-623214_thin-mint-clipart-thin-mint-cookies-transparent.png',
      price: 0.0,
      description: 'Minty, soft, refreshing, decadent, ....awesome!'
    })

    const guest = await User.create({
      email: 'thinMint@gmail.com',
      password: 'cookie',
      isAdmin: false,
      googleId: ''
    })

    const admin = await User.create({
      email: 'thinMint@gmail.com',
      password: 'cookie',
      isAdmin: true,
      googleId: ''
    })

    const order = await Order.create({
      total: 30.0,
      isActive: true
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = seed
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err)
      db.close()
    })
}
