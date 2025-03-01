import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'

function PhotoDetailView({ photo, handleSetPhoto }) {
    
    return (
        <Container>
            <Row>
                <Image src={photo.cloudinary_link} alt={`Photo ${photo.id} Image`} />
            </Row>
            <Row>
                <Col xs={4}>
                    <Button>Add to Cart</Button>
                </Col>
                <Col xs={4}>
                    ${photo.photo_price}
                </Col>
                <Col xs={4}>
                    <Button onClick={()=>handleSetPhoto(null)}>Return to PhotoShoot</Button>
                </Col>
            </Row>
        </Container>
    )

}

export default PhotoDetailView