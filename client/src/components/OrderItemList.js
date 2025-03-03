import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import OrderItemCard from './OrderItemCard.js'

function OrderItemList({ orderItems, handleSetOrderItem }) {
    return (
        <Container>
            <Row>
                {orderItems && orderItems.map((orderItem) => 
                    <Col key={orderItem.id} xs={4}>
                        <OrderItemCard orderItem={orderItem} handleSetOrderItem={handleSetOrderItem} />
                    </Col>
                )}
            </Row>
        </Container>
    )
}

export default OrderItemList