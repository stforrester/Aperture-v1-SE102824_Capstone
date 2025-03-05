import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import NavBar_PhotoShoot from './NavBar_PhotoShoot.js'
import OrderPhotosContainer from './OrderPhotosContainer.js'
import CartButton from './CartButton.js'

function PhotoShootDetailView({ updateUser }) {

    return (
        <>
        <Container fluid>
            <Row className="pb-3 d-flex justify-content-between align-items-center">
                <Col xs={11} />

                <Col xs={1}>
                    <CartButton />
                </Col>

            </Row>
        </Container>

        <NavBar_PhotoShoot updateUser={updateUser}/>
        <OrderPhotosContainer />
        </>
    )
}

export default PhotoShootDetailView