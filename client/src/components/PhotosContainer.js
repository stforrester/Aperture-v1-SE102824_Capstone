import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import PhotoList from './PhotoList'
import PhotoDetailView from './PhotoDetailView'

function PhotosContainer() {

    const { id } = useParams()

    const [photoShoot, setPhotoShoot] = useState()
    const [photo, setPhoto] = useState(null)
    const [cart, setCart] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        fetch(`/photo_shoots/${id}`)
        .then(response => {
            if(response.ok){
                response.json()
                .then(data =>{
                    setPhotoShoot(data)
                })
            }
            else {
                response.json()
                .then(error => setError(error))
            }
        })
    }, [])

    useEffect(() => {
        fetch('/cart')
        .then(response => {
            if(response.ok){
                response.json()
                .then(data=>{
                    setCart(data)
                })
            }
            else {
                response.json
                .then(error => setError(error))
            }
        })
    }, [])

    const handleSetPhoto = (photo) => {
        setPhoto(photo)
    }

    if(!photoShoot) return <div>Loading Photos...</div>

    if(!photo) return (
        <div>
            <h3>{photoShoot.title} {photoShoot.date}</h3>
            <PhotoList photos={photoShoot.photos} handleSetPhoto={handleSetPhoto} cart={cart}/>
        </div>
    )

    return (
        <div>
            <h3>{photoShoot.title} {photoShoot.date} - Photo ID: {photo.id}</h3>
            <PhotoDetailView photo={photo} handleSetPhoto={handleSetPhoto} cart={cart}/>            
        </div>
    )

}

export default PhotosContainer