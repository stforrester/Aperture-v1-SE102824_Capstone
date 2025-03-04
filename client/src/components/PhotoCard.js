import React, { useState } from "react"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function PhotoCard({ photo, handleSetPhoto, cart, orderItems=[], handleSetOrderItems}) {

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
            }
            else {
                response.json()
                .then(error => setError(error))
            }
        })
    }

    if(!(orderItems.some(obj => obj.photo_id === photo.id))){
        return (
            <Card style={{width: '20rem'}}>
                <Card.Body>
                    <Card.Title>{"Photo ID: "+photo.id || "Photo ID"}</Card.Title>
                    <Card.Img variant="top" src={photo.cloudinary_link} alt={`Photo ${photo.id} Image`} />
                    <Card.Text className="d-flex justify-content-center mt-3">${photo.photo_price}</Card.Text>
                    <Button onClick={()=>handleSetPhoto(photo)}>View Photo</Button>
                    <Button onClick={()=>handleAddtoCart(cart, photo)}>Add to Cart</Button>
                </Card.Body>
            </Card>
        )
    }
    else{
        return (
            <Card style={{width: '20rem'}}>
                <Card.Body>
                    <Card.Title>{"Photo ID: "+photo.id || "Photo ID"}</Card.Title>
                    <Card.Img variant="top" src={photo.cloudinary_link} alt={`Photo ${photo.id} Image`} />
                    <Card.Text className="d-flex justify-content-center mt-3">${photo.photo_price}</Card.Text>
                    <Button onClick={()=>handleSetPhoto(photo)}>View Photo</Button>
                    <Button onClick={()=>handleRemoveFromCart(orderItems.find(obj => obj.photo_id === photo.id))}>Remove from Cart</Button>
                </Card.Body>
            </Card>
        )
    }

}

export default PhotoCard