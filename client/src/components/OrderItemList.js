import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import PhotoCard from './PhotoCard.js'

function OrderItemList({ orderItems, handleSetOrderItem }) {
    return (
        <Container>
            <Row>
                {orderItems && orderItems.map((orderItem) => 
                    <Col key={orderItem.id} xs={4}>
                        <PhotoCard photo={orderItem.photo} handleSetPhoto={handleSetOrderItem} />
                    </Col>
                )}
            </Row>
        </Container>
    )
}

export default OrderItemList