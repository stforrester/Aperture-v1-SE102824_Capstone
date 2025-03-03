import React from 'react'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

function CartButton() {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/cart")
    }

    return (
        <Button onClick={handleClick}>Cart</Button>
    )
}

export default CartButton