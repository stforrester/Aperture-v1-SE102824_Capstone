import React, { useState } from 'react'

import NavBar_PhotoShoot from './NavBar_PhotoShoot.js'
import OrderItemContainer from './OrderItemContainer.js'

function CartPage({ updateUser }) {

    return (
        <>
        <h3>My Cart: </h3>
        <NavBar_PhotoShoot updateUser={updateUser}/>
        <OrderItemContainer />
        </>
    )
}

export default CartPage