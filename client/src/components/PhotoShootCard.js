import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function PhotoShootCard({photoShoot}) {
    const navigate = useNavigate()

    const handleViewPhotosRedirect = () => {
        navigate(`/photoshoots/${photoShoot.id}`)
    }


    return (
        <Card style={{width: '25rem'}}>
            <Card.Body>
                <Card.Title>{photoShoot.title || "Photo Shoot Title"}</Card.Title>
                <Card.Subtitle>{photoShoot.date || "Photo Shoot Date"}</Card.Subtitle>
                <Card.Img variant="top" src={photoShoot.photos[0].cloudinary_link} alt={`${photoShoot.title} First Image`} />
                <Card.Text className="d-flex justify-content-left mt-3">Description: {photoShoot.description}</Card.Text>
                <Card.Text className="d-flex justify-content-left mt-3">Photographer: {photoShoot.photographer}</Card.Text>
                <Button onClick={()=>handleViewPhotosRedirect()}>View Photos</Button>
            </Card.Body>
        </Card>
    )

}

export default PhotoShootCard