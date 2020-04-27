import React from 'react'

import {Navbar} from './components'
import CartMain from './components/cart/cartMain'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <CartMain /> */}
      <Routes />
    </div>
  )
}

export default App
