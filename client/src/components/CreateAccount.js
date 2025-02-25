import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

function CreateAccount({ updateUser }) {
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const formSchema = yup.object().shape({
        username: yup.string().required("Please enter a username"),
        firstname: yup.string().required("Please enter your first name"),
        lastname: yup.string().required("Please enter your last name"),
        email: yup.string().required("Please enter a valid email address"),
        password: yup.string().required("Please enter a password")
    })

    const formik = useFormik({
        initialValues: {
            username:'',
            firstname:'',
            lastname:'',
            email:'',
            password:''
        },
        validationSchema: formSchema,
        onSubmit: (inputs) => {
            fetch('/users',
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

    const handleLoginRedirect = () => {
        navigate("/")
    }

    return (
        <>
        <h1>Create New Account:</h1>
        <form onSubmit={formik.handleSubmit}>
            <label>Username: </label>
            <input type ='text' name='username' value={formik.values.username} onChange={formik.handleChange} />
            <br />
            <br />
            <label>First Name: </label>
            <input type ='text' name='firstname' value={formik.values.firstname} onChange={formik.handleChange} />
            <br />
            <br />
            <label>Last Name: </label>
            <input type ='text' name='lastname' value={formik.values.lastname} onChange={formik.handleChange} />
            <br />
            <br />
            <label>Email Address: </label>
            <input type ='text' name='email' value={formik.values.email} onChange={formik.handleChange} />
            <br />
            <br />
            <label>Password: </label>
            <input type ='text' name='password' value={formik.values.password} onChange={formik.handleChange} />
            <br />
            <br />
            <input type='submit' value={'Create Account'} />
        </form>
        {error && <h1 style={{color:'red'}}>{error.error}</h1>}
        <br />
        <button type="button" onClick={handleLoginRedirect}>Return to login</button>
        </>
    )

}

export default CreateAccount