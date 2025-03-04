import React from 'react'

import NavBar_PhotoShoot from './NavBar_PhotoShoot.js'
import PhotosContainer from './PhotosContainer.js'

function PhotoShootDetailView({ updateUser }) {

    return (
        <>
        <NavBar_PhotoShoot updateUser={updateUser}/>
        <PhotosContainer />
        </>
    )
}

export default PhotoShootDetailView