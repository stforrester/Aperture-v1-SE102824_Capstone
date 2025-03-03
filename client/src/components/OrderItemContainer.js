import React, { useEffect, useState } from 'react'

import OrderItemList from './OrderItemList'
import OrderItemDetailView from './OrderItemDetailView'

function OrderItemContainer() {

    const [order, setOrder] = useState()
    const [orderItem, setOrderItem] = useState(null)
    const [error, setError] = useState()

    useEffect(() => {
        fetch(`/cart`)
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

    const handleSetOrderItem = (orderItem) => {
        setOrderItem(orderItem)
    }

    if(!order) return <div>Loading Photos in Cart...</div>

    if(!orderItem) return (
        <div>
            <OrderItemList orderItems={order.order_items} handleSetOrderItem={handleSetOrderItem} />
        </div>
    )

    return (
        <div>
            <h3>{orderItem.photo.photo_shoot.title} {orderItem.photo.photo_shoot.title} - Photo ID: {orderItem.photo.id}</h3>
            <OrderItemDetailView photo={orderItem.photo} handleSetOrderItem={handleSetOrderItem}/>        
        </div>
    )

}

export default OrderItemContainer