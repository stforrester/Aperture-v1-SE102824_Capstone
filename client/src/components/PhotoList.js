import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import PhotoCard from './PhotoCard.js'

function PhotoList({ photos, handleSetPhoto, cart, orderItems, handleSetOrderItems }) {
    return (
        <Container>
            <Row>
                {photos && photos.map((photo) => 
                    <Col key={photo.id} xs={4}>
                        <PhotoCard photo={photo} handleSetPhoto={handleSetPhoto} cart={cart} orderItems={orderItems} handleSetOrderItems={handleSetOrderItems}/>
                    </Col>
                )}
            </Row>
        </Container>
    )
}

export default PhotoList