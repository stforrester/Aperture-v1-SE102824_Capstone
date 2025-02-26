import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import NavBar_HomePage from './NavBar_HomePage.js'
import PhotoShootContainer from './PhotoShootContainer.js'

function HomePage({ updateUser, user }) {
    
    return (
        <>
        <h1>Welcome, {user.firstname} {user.lastname}!</h1>
        <NavBar_HomePage updateUser={updateUser}/>
        <PhotoShootContainer />
        </>
    )
}

export default HomePage