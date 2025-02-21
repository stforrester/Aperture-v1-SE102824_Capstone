import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function NavBar_HomePage({ updateUser }) {
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
    
    return (
        <>
        <span>
            Menu:
            <button type="button">View Order History</button>
            <button type="button">Edit Account Info</button>
            <button type="button" onClick={logout}>Logout</button>
        </span>
        </>
    )
}

export default NavBar_HomePage