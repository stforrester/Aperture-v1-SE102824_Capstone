import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function PhotosContainer() {

    const { id } = useParams()

    const [photoShoot, setPhotoShoot] = useState()
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

    if(!photoShoot) return <div>Loading Photos...</div>

    return (
        <div>
            <h3>{photoShoot.title} {photoShoot.date}</h3>
            
        </div>
    )

}

export default PhotosContainer