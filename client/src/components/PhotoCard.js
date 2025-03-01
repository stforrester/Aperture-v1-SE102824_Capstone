import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'

function PhotoCard({ photo, handleSetPhoto }) {
    
    return (
        <Card style={{width: '20rem'}}>
            <Card.Body>
                <Card.Title>{"Photo ID: "+photo.id || "Photo ID"}</Card.Title>
                <Card.Img variant="top" src={photo.cloudinary_link} alt={`Photo ${photo.id} Image`} />
                <Card.Text className="d-flex justify-content-center mt-3">${photo.photo_price}</Card.Text>
                <Button onClick={()=>handleSetPhoto(photo)}>View Photo</Button>
                <Button>Add to Cart</Button>
            </Card.Body>
        </Card>
    )

}

export default PhotoCard