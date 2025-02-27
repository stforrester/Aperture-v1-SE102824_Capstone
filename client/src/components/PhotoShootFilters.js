import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'

function PhotoShootFilters({handleSortAscendingSelected, handleSortDescendingSelected}) {
    return (
        <Container fluid>
            <Col xs={2}>
                <span>My Photo Shoots:</span>
            </Col>

            <Col xs={5}></Col>

            <Col xs={1}>Sort By:</Col>

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

        </Container>
    )
}

export default PhotoShootFilters