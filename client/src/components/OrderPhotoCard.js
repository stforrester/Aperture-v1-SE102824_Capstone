import React from "react"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function OrderPhotoCard({ photo, handleSetPhoto }) {
    return (
        <Card style={{width: '20rem'}}>
            <Card.Body>
                <Card.Title>{"Photo ID: "+photo.id || "Photo ID"}</Card.Title>
                <Card.Img variant="top" src={photo.cloudinary_link} alt={`Photo ${photo.id} Image`} />
                <Card.Text className="d-flex justify-content-center mt-3">${photo.photo_price}</Card.Text>
                <Button onClick={()=>handleSetPhoto(photo)}>View Photo</Button>
                <Button >Download</Button>
            </Card.Body>
        </Card>
    )
}

export default OrderPhotoCard