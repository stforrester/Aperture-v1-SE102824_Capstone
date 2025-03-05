import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import OrderPhotosList from './OrderPhotosList'
import OrderPhotoDetailView from './OrderPhotoDetailView'

function OrderPhotosContainer() {

    const { id } = useParams()

    const [order, setOrder] = useState()
    const [photo, setPhoto] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        fetch(`/orders/${id}`)
        .then(response => {
            if(response.ok){
                response.json()
                .then(data =>{
                    setOrder(data)
                })
            }
            else {
                response.json()
                .then(error => setError(error))
            }
        })
    }, [])

    const orderPhotos = () => {
        let orderPhotos = []
        order.order_items.forEach(obj => {
            orderPhotos.push(obj.photo)
        })
        return orderPhotos
    }

    const handleSetPhoto = (photo) => {
        setPhoto(photo)
    }

    if (!order) return <div>Loading Order Photos...</div>

    if (!photo) return (
        <div>
            <h3>Order: {order.id} - Placed: {order.order_date}</h3>
            <OrderPhotosList photos={orderPhotos()} handleSetPhoto={handleSetPhoto} ></OrderPhotosList>
        </div>
    )

    return (
        <div>
            <h3>Order: {order.id} - Placed: {order.order_date}</h3>
            <OrderPhotoDetailView photo={photo} handleSetPhoto={handleSetPhoto} />
        </div>
    )

}

export default OrderPhotosContainer