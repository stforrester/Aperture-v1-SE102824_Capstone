import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage({ updateUser, user }) {
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
        <h1>Welcome, {user.firstname} {user.lastname}!</h1>
        <button type="button" onClick={logout}>Logout</button>
        </>
    )
}

export default HomePage