import { useState, useEffect } from 'react'

import PhotoShootList from './PhotoShootList.js'

function PhotosContainer({ photos }) {

    if(!photos) return <div>Loading Photos...</div>

    return (
        <div>
            <h2>{photos.title} {photos.date}</h2>
            <PhotoShootList photos={photos}/>
        </div>
    )

}

export default PhotosContainer