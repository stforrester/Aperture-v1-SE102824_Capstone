import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import NavBar_OrdersPage from './NavBar_OrdersPage.js'
import CartButton from './CartButton.js'

function OrdersPage({ updateUser, user }) {

    return (
        <>
            <Container fluid>
                <Row className="pb-3 d-flex justify-content-between align-items-center">
                    <Col xs={11}/>

                    <Col xs={1}>
                        <CartButton />
                    </Col>

                </Row>
            </Container>

            <NavBar_OrdersPage updateUser={updateUser}/>
        </>
    )
}

export default OrdersPage