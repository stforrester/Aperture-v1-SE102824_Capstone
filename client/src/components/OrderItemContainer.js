import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import OrderItemList from './OrderItemList'
import OrderItemDetailView from './OrderItemDetailView'

function OrderItemContainer() {
    const navigate = useNavigate()

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

    const handlePlaceOrder = () => {
        fetch(`/checkout/${order.id}`,
            {
                method:'PATCH',
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(""),
            }
        )
        .then(response => {
            if(response.ok){
                response.json()
                .then(newOrderData => {
                    setOrder(newOrderData)
                    setOrderItems(newOrderData.order_items)
                    navigate('/')
                })
            }
            else {
                response.json()
                .then(error => setError(error))
            }
        })
    }

    const totalOrderCost = () => {
        let totalPrice = 0
        orderItems.forEach(obj =>{
            totalPrice += obj.photo.photo_price
        })
        return totalPrice.toFixed(2)
    }

    if(!order) return <div>Loading Photos in Cart...</div>

    if(!orderItem) return (
        <div>
            <OrderItemList orderItems={orderItems} handleSetOrderItem={handleSetOrderItem} handleSetOrderItems={handleSetOrderItems}/>
            <Container fluid>
            <Row className="pb-3 d-flex justify-content-center">
                <Col className="text-center">
                    <p>Total: ${totalOrderCost()}</p>
                </Col>
            </Row>
            <Row className="pb-3 d-flex justify-content-center">
                <Col className="text-center">
                    <Button onClick={()=>handlePlaceOrder()}>Place Order</Button>
                </Col>
            </Row>
        </Container>
        </div>
    )

    return (
        <div>
            <h3>{orderItem.photo.photo_shoot.title} {orderItem.photo.photo_shoot.title} - Photo ID: {orderItem.photo.id}</h3>
            <OrderItemDetailView orderItem={orderItem} handleSetOrderItem={handleSetOrderItem} orderItems={orderItems} handleSetOrderItems={handleSetOrderItems}/>        
        </div>
    )

}

export default OrderItemContainer