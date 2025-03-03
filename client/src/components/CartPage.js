import React, { useState } from 'react'

import NavBar_PhotoShoot from './NavBar_PhotoShoot.js'

function CartPage({ updateUser }) {

    return (
        <>
        <NavBar_PhotoShoot updateUser={updateUser}/>
        </>
    )
}

export default CartPage