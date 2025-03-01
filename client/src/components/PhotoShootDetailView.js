import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

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