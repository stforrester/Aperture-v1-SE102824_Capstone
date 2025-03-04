import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import NavBar_EditAccount from './NavBar_EditAccount'
import CartButton from './CartButton'

function EditAccount({ updateUser, user }) {
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const formSchema = yup.object().shape({
        username: yup.string().required(),
        firstname: yup.string(),
        lastname: yup.string(),
        email: yup.string(),
        password: yup.string()
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

            const requestBody = { ...inputs }

            for (let formAttribute in inputs) {
                if (!inputs[formAttribute]) {
                delete requestBody[formAttribute]
            }}
           
            fetch(`/users/${user.id}`,
                {
                    method:'PATCH',
                    headers: {
                        "Content-Type":"application/json",
                    },
                    body: JSON.stringify(requestBody),
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

    return(
        <>
         <Container fluid>
            <Row className="pb-3 d-flex justify-content-between align-items-center">
                <Col xs={2}>
                    <span><h3>Edit Account Info</h3></span>
                </Col>

                <Col xs={1}>
                    <CartButton />
                </Col>

            </Row>
        </Container>
        <NavBar_EditAccount updateUser={updateUser}/>
        <h4>Edit Account Form:</h4>
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