import { useState, useEffect } from 'react'

import PhotoShootList from './PhotoShootList.js'
import PhotoShootFilters from './PhotoShootFilters.js'

function PhotoShootContainer() {

    const [photoShootsData, setPhotoShootsData] = useState()
    const [photoShoots, setPhotoShoots] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        fetch('/photo_shoots')
        .then(response => {
            if(response.ok){
                response.json()
                .then(data =>{
                    setPhotoShoots(data)
                    setPhotoShootsData(data)
                })
            }
            else {
                response.json()
                .then(error => setError(error))
            }
        })
    }, [setPhotoShootsData])

    if(!photoShoots) return <div>Loading Photo Shoots...</div>

    return (
        <div>
            <PhotoShootFilters />
            <PhotoShootList photoShoots={photoShoots} />
        </div>
    )

}

export default PhotoShootContainer