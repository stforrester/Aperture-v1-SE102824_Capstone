import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

function EditAccount({ updateUser, user }) {
    const [error, setError] = useState(null)

    const formSchema = yup.object().shape({
        username: yup.string().required(),
        firstname: yup.string().required(),
        lastname: yup.string().required(),
        email: yup.string().required(),
        password: yup.string().required()
    })

    const formik = useFormik({
        initialValues: {
            username:user.username,
            firstname:user.firstname,
            lastname:user.lastname,
            email:user.email,
            password:''
        },
        validationSchema: formSchema,
        onSubmit: (inputs) => {
            fetch(`/users/${user.id}`,
                {
                    method:'PATCH',
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
                    })
                }
                else {
                    response.json()
                    .then(error => setError(error))
                }
            })
        },
    })

    return(
        <>
        <h1>Edit Account Form:</h1>
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
            <input type='submit' value={'Update Account'} />
        </form>
        {error && <h1 style={{color:'red'}}>{error.error}</h1>}
        </>
    )
}

export default EditAccount