import React, { useState } from "react"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function OrderItemCard({ orderItem, handleSetOrderItem, orderItems, handleSetOrderItems }) {
    const [error, setError] = useState()

    const photo = orderItem.photo

    const handleRemove = (id) => {
        fetch(`/order_items/${id}`,
            {
                method:'DELETE',
                headers: {
                    "Content-Type":"application/json",
                },
            }
        )
        .then(response => {
            if(response.ok){
                handleSetOrderItems(
                    orderItems.filter(item => item !== orderItem)
                )
            }
            else {
                response.json()
                .then(error => setError(error))
            }
        })
    }

    return (
        <Card style={{width: '20rem'}}>
            <Card.Body>
                <Card.Title>{"Photo ID: "+photo.id || "Photo ID"}</Card.Title>
                <Card.Img variant="top" src={photo.cloudinary_link} alt={`Photo ${photo.id} Image`} />
                <Card.Text className="d-flex justify-content-center mt-3">${photo.photo_price}</Card.Text>
                <Button onClick={()=>handleSetOrderItem(orderItem)}>View Photo</Button>
                <Button onClick={()=>handleRemove(orderItem.id)}>Remove</Button>
            </Card.Body>
        </Card>
    )

}

export default OrderItemCard