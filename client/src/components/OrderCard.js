import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

function OrderCard({ order }) {
    const navigate = useNavigate()

    const handleAccessOrderPhotosRedirect = () => {
        navigate(`/orders/${order.id}`)
    }

    return (
        <Card style={{width: '80rem'}}>
            <Card.Body>
                <Card.Title>
                    <Container>
                        <Row className="pb-3 d-flex justify-content-between align-items-center">
                            <Col xs={2}>Order ID: {order.id}</Col>
                            <Col xs={3}>{order.order_date}</Col>
                            <Col xs={2}>Photo Quantity: {order.photo_quantity}</Col>
                        </Row>
                        <Row className="pb-3 d-flex justify-content-between align-items-center">
                            <Col xs={2}></Col>
                            <Col xs={3}>
                                <Button onClick={()=>handleAccessOrderPhotosRedirect()}>Access Photos in this Order</Button>
                            </Col>
                            <Col xs={2}>Order Price: ${order.order_price}</Col>
                        </Row>
                    </Container>
                </Card.Title>
            </Card.Body>
        </Card>
    )
}

export default OrderCard