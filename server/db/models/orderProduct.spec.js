const {expect} = require('chai')
const db = require('../index')
const OrderProduct = db.model('orderProduct')

describe('orderProduct Model', () => {
  before(() => db.sync({force: true}))
  afterEach(() => db.sync({force: true}))

  it('has quantity and price', async () => {
    const orderProduct = await OrderProduct.create({
      quantity: 5,
      price: 10
    })
    expect(orderProduct.quantity).to.equal(5)
    expect(orderProduct.price).to.equal(10)
  })
})
