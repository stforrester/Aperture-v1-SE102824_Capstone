import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

function Login({ updateUser }) {
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const formSchema = yup.object().shape({
        username: yup.string().required("Please enter your username"),
        password: yup.string().required("Please enter your password")
    })

    const formik = useFormik({
        initialValues: {
            username:'Enter your Username here',
            password:'Enter your Password here' 
        },
        validationSchema: formSchema,
        onSubmit: (inputs) => {
            fetch('/login',
                {
                    method:'POST',
                    headers: {
                        "Content-Type":"application/json",
                    },
                    body: JSON.stringify(inputs),
                }
            )
            .then(response => {
                if(response.ok){
                    response.json()
                    .then(user_data => {
                        updateUser(user_data)
                        navigate('/')
                    })
                }
                else {
                    response.json()
                    .then(error => setError(error))
                }
            })
        },
    })

    const handleCreateAccountRedirect = () => {
        navigate("/createAccount"); 
      };

    return (
        <>
        <h1>Login:</h1>
        <Form onSubmit={formik.handleSubmit}>
        <label>Username: </label>
        <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} />
        <label>Password: </label>
        <input type='text' name='password' value={formik.values.password} onChange={formik.handleChange} />
        <input type='submit' value={'Sign in'} />
        </Form>
        {error && <h1 style={{color:'red'}}>{error.error}</h1>}
        <></>
        <h3>Don't have an account? Create one using the link below: </h3>
        <button type="button" onClick={handleCreateAccountRedirect}>Create Account</button>
        </>
    )

}

export default Login