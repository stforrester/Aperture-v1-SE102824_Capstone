import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import OrderCard from './OrderCard.js'

function OrdersList({orders}) {
    return (
        <Container>
            {orders && orders.map((order) => 
                <Row key={order.id}>
                    <Col xs={10}>
                        <OrderCard order={order} />
                    </Col>
                </Row>
            )}
            <Row></Row>
        </Container>
    )
}

export default OrdersList