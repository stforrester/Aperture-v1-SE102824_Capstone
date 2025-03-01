import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import NavBar_PhotoShoot from './NavBar_PhotoShoot.js'


function PhotoShootDetailView({ updateUser }) {

    const navigate = useNavigate()
    const { id } = useParams()

    const [photoShootData, setPhotoShootData] = useState()
    const [photoShoot, setPhotoShoot] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        fetch(`photo_shoots/${id}`)
        .then(response => {
            if(response.ok){
                response.json()
                .then(data =>{
                    setPhotoShoot(data)
                    setPhotoShootData(data)
                })
            }
            else {
                response.json()
                .then(error => setError(error))
            }
        })
    }, [setPhotoShootData])
    
    return (
        <>
        <NavBar_PhotoShoot updateUser={updateUser}/>
        <h2></h2>
        
        </>
    )
}

export default PhotoShootDetailView