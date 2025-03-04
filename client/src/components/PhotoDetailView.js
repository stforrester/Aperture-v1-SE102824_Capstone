import React, { useState } from "react"
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { Image } from 'cloudinary-react'

function PhotoDetailView({ photo, handleSetPhoto, cart, orderItems=[], handleSetOrderItems }) {

    const [error, setError] = useState()

    const handleAddtoCart = (cart, photo) => {
        let body = {
            order_id:cart.id,
            photo_id:photo.id
        }

        fetch('/order_items',
            {
                method:'POST',
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(body),
            }
        )
        .then(response => {
            if(response.ok){
                response.json()
                .then(orderItem_data => {
                    handleSetOrderItems([...orderItems, 
                        {id:orderItem_data.id, order_id:orderItem_data.order_id, photo:orderItem_data.photo, photo_id:orderItem_data.photo_id}
                    ])
                })
            }
            else {
                response.json()
                .then(error => setError(error))
            }
        })
    }

    const handleRemoveFromCart = (orderItem) => {
        fetch(`/order_items/${orderItem.id}`,
            {
                method:'DELETE',
                headers: {
                    "Content-Type":"application/json",
                },
            }
        )
        .then(response => {
            if(response.ok){
                handleSetOrderItems(orderItems.filter(obj => obj.id !== orderItem.id))
                handleSetPhoto(null)
            }
            else {
                response.json()
                .then(error => setError(error))
            }
        })
    }
    
    if(!(orderItems.some(obj => obj.photo_id === photo.id))){
        return (
            <Container>
                <Row>
                    <Image cloudName="stuart-forrester" publicId={photo.cloudinary_link} alt={`Photo ${photo.id} Image`} />
                </Row>
                <Row>
                    <Col xs={4}>
                        <Button onClick={()=>handleAddtoCart(cart, photo)}>Add to Cart</Button>
                    </Col>
                    <Col xs={4}>
                        ${photo.photo_price}
                    </Col>
                    <Col xs={4}>
                        <Button onClick={()=>handleSetPhoto(null)}>Return to PhotoShoot</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
    else{
        return (
            <Container>
                <Row>
                    <Image cloudName="stuart-forrester" publicId={photo.cloudinary_link} alt={`Photo ${photo.id} Image`} />
                </Row>
                <Row>
                    <Col xs={4}>
                        <Button onClick={()=>handleRemoveFromCart(orderItems.find(obj => obj.photo_id === photo.id))}>Remove from Cart</Button>
                    </Col>
                    <Col xs={4}>
                        ${photo.photo_price}
                    </Col>
                    <Col xs={4}>
                        <Button onClick={()=>handleSetPhoto(null)}>Return to PhotoShoot</Button>
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default PhotoDetailView