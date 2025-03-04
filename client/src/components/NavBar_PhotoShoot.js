import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NavBar_PhotoShoot({ updateUser }) {
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const logout = () => {
        fetch('/logout',
            {
                method:'DELETE',
                headers: {
                    "Content-Type":"application/json",
                }
            }
        )
        .then(response => {
            if(response.ok){
                updateUser(null)
                navigate('/')
            }
            else {
                response.json()
                .then(error => setError(error))
            }
        })
    }

    const handleHomePageRedirect = () => {
        navigate("/")
    }

    const handleOrderHistoryRedirect = () => {
        navigate("/orders")
    }

    const handleEditAccountRedirect = () => {
        navigate("/edit_account")
    }

    return (
        <>
        <span>
            Menu:
            <button type="button" onClick={handleHomePageRedirect}>My Photo Shoots</button>
            <button type="button" onClick={handleOrderHistoryRedirect}>View Order History</button>
            <button type="button" onClick={handleEditAccountRedirect}>Edit Account Info</button>
            <button type="button" onClick={logout}>Logout</button>
        </span>
        </>
    )
}

export default NavBar_PhotoShoot