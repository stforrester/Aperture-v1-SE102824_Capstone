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

    const handleSortClickAscending = (sort_field, nested=null) => {
        const sorted_photoShoots = photoShoots.toSorted((a, b) => {
            const a_sort = nested != null ? a[nested][sort_field] : a[sort_field]
            const b_sort = nested != null ? b[nested][sort_field] : b[sort_field]
            if (a_sort < b_sort) return -1;
            if (a_sort > b_sort) return 1;
            return 0; 
          });
        setPhotoShoots(sorted_photoShoots)
    }

    const handleSortClickDescending = (sort_field, nested=null) => {
        const sorted_photoShoots = photoShoots.toSorted((a, b) => {
            const a_sort = nested != null ? a[nested][sort_field] : a[sort_field]
            const b_sort = nested != null ? b[nested][sort_field] : b[sort_field]
            if (a_sort < b_sort) return 1;
            if (a_sort > b_sort) return -1;
            return 0; 
          });
        setPhotoShoots(sorted_photoShoots)
    }

    if(!photoShoots) return <div>Loading Photo Shoots...</div>

    return (
        <div>
            <PhotoShootFilters handleSortAscendingSelected={handleSortClickAscending} handleSortDescendingSelected={handleSortClickDescending} />
            <PhotoShootList photoShoots={photoShoots} />
        </div>
    )

}

export default PhotoShootContainer