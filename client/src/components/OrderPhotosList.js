import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import OrderPhotoCard from './OrderPhotoCard.js'

function OrderPhotosList({ photos, handleSetPhoto }) {
    return (
        <Container>
            <Row>
                {photos && photos.map((photo) => 
                    <Col key={photo.id} xs={4}>
                        <OrderPhotoCard photo={photo} handleSetPhoto={handleSetPhoto} />
                    </Col>
                )}
            </Row>
        </Container>
    )
}

export default OrderPhotosList