import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import NavBar_HomePage from './NavBar_HomePage.js'
import PhotoShootContainer from './PhotoShootContainer.js'
import CartButton from './CartButton.js'

function HomePage({ updateUser, user }) {
    
    return (
        <>
        <Container fluid>
            <Row className="pb-3 d-flex justify-content-between align-items-center">
                <Col xs={3}>
                    <span><h1>Welcome, {user.firstname} {user.lastname}!</h1></span>
                </Col>

                <Col xs={1}>
                    <CartButton />
                </Col>

            </Row>
        </Container>

        <NavBar_HomePage updateUser={updateUser}/>
        <PhotoShootContainer />
        </>
    )
}

export default HomePage