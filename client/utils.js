const quantityAlert = (qty, productId, orderId, name, funcDown) => {
  if (qty === 0) {
    funcDown(productId, orderId)
  } else if (qty < 2) {
    alert(`Sorry, you can't purchase less than 0 ${name}`)
  } else if (qty > 19) {
    alert(`Sorry, we don't have more than 20 ${name}s in stock :(`)
  }
}

module.exports = {quantityAlert}
