import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import PhotoShootCard from './PhotoShootCard.js'

function PhotoShootList({photoShoots}) {
    return (
        <Container>
            <Row>
                {photoShoots && photoShoots.map((photoShoot) => 
                    <Col key={photoShoot.id} xs={4}>
                        <PhotoShootCard photoShoot={photoShoot} />
                    </Col>
                )}
            </Row>
        </Container>
    )
}

export default PhotoShootList