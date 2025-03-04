import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { Image } from 'cloudinary-react'

function OrderItemDetailView({ orderItem, handleSetOrderItem }) {

    const photo = orderItem.photo
    
    return (
        <Container>
            <Row>
                <Image cloudName="stuart-forrester" publicId={photo.cloudinary_link} alt={`Photo ${photo.id} Image`} />
            </Row>
            <Row>
                <Col xs={4}>
                    <Button>Remove from Cart</Button>
                </Col>
                <Col xs={4}>
                    ${photo.photo_price}
                </Col>
                <Col xs={4}>
                    <Button onClick={()=>handleSetOrderItem(null)}>Return to Cart</Button>
                </Col>
            </Row>
        </Container>
    )

}

export default OrderItemDetailView