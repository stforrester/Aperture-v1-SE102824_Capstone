import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import PhotoCard from './PhotoCard.js'

function PhotoList({ photos }) {
    return (
        <Container>
            <Row>
                {photos && photos.map((photo) => 
                    <Col key={photo.id} xs={4}>
                        <PhotoCard photo={photo} />
                    </Col>
                )}
            </Row>
        </Container>
    )
}

export default PhotoList