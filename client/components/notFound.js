import React from 'react'
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      {/* <h1>404 Error: Page Not Found</h1> */}
      <Link to="/products">Return to All Products Page</Link>
      <img src="https://doyouconvert.com/wp-content/uploads/2018/04/404_Error.jpg" />
    </div>
  )
}

export default NotFound
