import React, { useEffect, useState } from 'react'

import OrderItemList from './OrderItemList'
import OrderItemDetailView from './OrderItemDetailView'

function OrderItemContainer() {

    const [order, setOrder] = useState()
    const [orderItem, setOrderItem] = useState(null)
    const [orderItems, setOrderItems] = useState(null)
    const [error, setError] = useState()

    useEffect(() => {
        fetch(`/cart`)
        .then(response => {
            if(response.ok){
                response.json()
                .then(data =>{
                    setOrder(data)
                    setOrderItems(data.order_items)
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

    const handleSetOrderItems = (orderItems) => {
        setOrderItems(orderItems)
    }

    if(!order) return <div>Loading Photos in Cart...</div>

    if(!orderItem) return (
        <div>
            <OrderItemList orderItems={orderItems} handleSetOrderItem={handleSetOrderItem} handleSetOrderItems={handleSetOrderItems}/>
        </div>
    )

    return (
        <div>
            <h3>{orderItem.photo.photo_shoot.title} {orderItem.photo.photo_shoot.title} - Photo ID: {orderItem.photo.id}</h3>
            <OrderItemDetailView orderItem={orderItem} handleSetOrderItem={handleSetOrderItem} handleSetOrderItems={handleSetOrderItems}/>        
        </div>
    )

}

export default OrderItemContainer