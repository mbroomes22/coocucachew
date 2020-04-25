// 'use strict'

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
    name: 'Snicker Doodle',
    type: 'cookie',
    imageUrl:
      'https://www.foxandbriar.com/wp-content/uploads/2019/09/Snickerdoodles-12-of-12.jpg',
    price: 2.0,
    description:
      'Sweet, soft, cinnamony...uhm, how do you describe perfection?',
    productCategoryId: 1
  })

  const thinMint = await Product.create({
    name: 'Thin Mint',
    type: 'cookie',
    imageUrl:
      'https://www.clipartkey.com/mpngs/m/62-623214_thin-mint-clipart-thin-mint-cookies-transparent.png',
    price: 3.0,
    description: 'Minty, soft, refreshing, decadent, ....awesome!',
    productCategoryId: 1
  })

  const chocolateChip = await Product.create({
    name: 'Chocolate Chip',
    type: 'cookie',
    imageUrl:
      'https://www.foxandbriar.com/wp-content/uploads/2019/09/Snickerdoodles-12-of-12.jpg',
    price: 4.0,
    description: 'the queen of all delicious cookies',
    productCategoryId: 1
  })

  const gingerSnap = await Product.create({
    name: 'Ginger Snap',
    type: 'cookie',
    imageUrl:
      'https://www.clipartkey.com/mpngs/m/62-623214_thin-mint-clipart-thin-mint-cookies-transparent.png',
    price: 3.0,
    description: 'gingery... yum!',
    productCategoryId: 1
  })

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '1234'}),
    User.create({email: 'anotherpug@email.com', password: '1234'})
  ])

  const user1 = User.create({
    email: 'giselle@email.com',
    password: '1235',
    isAdmin: true
  })

  const user2 = User.create({
    email: 'michelle@email.com',
    password: '1236',
    isAdmin: true,
    googleId: ''
  })

  const user3 = User.create({
    email: 'adriana@email.com',
    password: '1237',
    isAdmin: true
  })

  const user4 = User.create({
    email: 'yunshu@email.com',
    password: '1238',
    isAdmin: true
  })

  const user5 = User.create({
    email: 'giselleclone@email.com',
    password: '1231',
    isAdmin: false
  })

  const user6 = User.create({
    email: 'michelleclone@email.com',
    password: '1232',
    isAdmin: false
  })

  const user8 = User.create({
    email: 'adrianaclone@email.com',
    password: '1233',
    isAdmin: false
  })

  const user7 = User.create({
    email: 'yunshuclone@email.com',
    password: '12344',
    isAdmin: false
  })

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

  const order1 = await Order.create({
    userId: 1,
    isActive: true
  })

  const order2 = await Order.create({
    userId: 2,
    isActive: true
  })

  const orderproduct = await OrderProduct.create({
    quantity: 1,
    price: 4,
    productId: 1,
    orderId: 1
  })

  const orderproduct3 = await OrderProduct.create({
    quantity: 1,
    price: 3,
    productId: 2,
    orderId: 1
  })

  const orderproduct4 = await OrderProduct.create({
    quantity: 1,
    price: 5,
    productId: 3,
    orderId: 1
  })

  const orderproduct5 = await OrderProduct.create({
    quantity: 1,
    price: 2,
    productId: 4,
    orderId: 2
  })

  const orderproduct6 = await OrderProduct.create({
    quantity: 1,
    price: 3,
    productId: 4,
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
