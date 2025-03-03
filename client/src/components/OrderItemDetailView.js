import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { Image } from 'cloudinary-react'

function OrderItemDetailView({ orderItem, handleSetOrderItem }) {

    return (
        <Container>
            <Row>
                <Image cloudName="stuart-forrester" publicId={orderItem.photo.cloudinary_link} alt={`Photo ${orderItem.photo.id} Image`} />
            </Row>
            <Row>
                <Col xs={4}>
                    <Button>Remove</Button>
                </Col>
                <Col xs={4}>
                    ${orderItem.photo.photo_price}
                </Col>
                <Col xs={4}>
                    <Button onClick={()=>handleSetOrderItem(null)}>Return to Cart</Button>
                </Col>
            </Row>
        </Container>
    )

}

export default OrderItemDetailView