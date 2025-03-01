import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'

function PhotoShootFilters({handleSortAscendingSelected, handleSortDescendingSelected}) {
    return (
        <Container fluid>
            <Row className="pb-3 d-flex justify-content-between align-items-center">
                <Col xs={4}>
                    <span><h3>My Photo Shoots:</h3></span>
                </Col>

                <Col xs={5}></Col>

                <Col xs={1} className="text-end">Sort By:</Col>

                <Col xs={1}>
                    <Dropdown>
                        <Dropdown.Toggle>
                            Date
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={()=>handleSortAscendingSelected('date')}>Ascending</Dropdown.Item>
                            <Dropdown.Item onClick={()=>handleSortDescendingSelected('date')}>Descending</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>

                <Col xs={1}>
                    <Dropdown>
                        <Dropdown.Toggle>
                            Name
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={()=>handleSortAscendingSelected('title')}>A - Z</Dropdown.Item>
                            <Dropdown.Item onClick={()=>handleSortDescendingSelected('title')}>Z - A</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>

        </Container>
    )
}

export default PhotoShootFilters