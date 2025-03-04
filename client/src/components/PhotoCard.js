import React, { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'

function PhotoCard({ photo, handleSetPhoto, cart }) {

    const [inCart, setInCart] = useState(null)
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
                    setInCart(orderItem_data)
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
                setInCart(null)
            }
            else {
                response.json()
                .then(error => setError(error))
            }
        })
    }

    //if(!inCart){
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
    //}
    /*else{
        return (
            <Card style={{width: '20rem'}}>
                <Card.Body>
                    <Card.Title>{"Photo ID: "+photo.id || "Photo ID"}</Card.Title>
                    <Card.Img variant="top" src={photo.cloudinary_link} alt={`Photo ${photo.id} Image`} />
                    <Card.Text className="d-flex justify-content-center mt-3">${photo.photo_price}</Card.Text>
                    <Button onClick={()=>handleSetPhoto(photo)}>View Photo</Button>
                    <Button onClick={()=>handleRemoveFromCart(inCart)}>Remove from Cart</Button>
                </Card.Body>
            </Card>
        )
    }*/

}

export default PhotoCard