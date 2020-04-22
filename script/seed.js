'use strict'

const db = require('../server/db')
const {
  User,
  Order,
  Product,
  OrderProduct,
  ProductCategory
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const cookies = await ProductCategory.create({
    name: 'cookies'
  })

  const chocolates = await ProductCategory.create({
    name: 'chocolates'
  })

  const cakePops = await ProductCategory.create({
    name: 'cakePops'
  })

  const cupcakes = await ProductCategory.create({
    name: 'cupcakes'
  })

  const snickerDoodle = await Product.create({
    name: 'snickerDoodle',
    type: 'cookie',
    image:
      'https://www.foxandbriar.com/wp-content/uploads/2019/09/Snickerdoodles-12-of-12.jpg',
    price: 0.0,
    description:
      'Sweet, soft, cinnamony...uhm, how do you describe perfection?',
    productCategoryId: 1
  })

  const thinMint = await Product.create({
    name: 'thinMint',
    type: 'cookie',
    image:
      'https://www.clipartkey.com/mpngs/m/62-623214_thin-mint-clipart-thin-mint-cookies-transparent.png',
    price: 0.0,
    description: 'Minty, soft, refreshing, decadent, ....awesome!',
    productCategoryId: 1
  })

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const guest = await User.create({
    email: 'thinMint@gmail.com',
    password: 'cookie',
    isAdmin: false,
    googleId: ''
  })

  const admin = await User.create({
    email: 'michelle@gmail.com',
    password: '12345',
    isAdmin: true,
    googleId: ''
  })

  const order = await Order.create({
    total: 30.0,
    isActive: true
  })

  const orderproduct = await OrderProduct.create({
    quantity: 1,
    price: 0,
    productId: 1,
    orderId: 1
  })

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
