import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Login from './Login.js'
import CreateAccount from './CreateAccount.js'
import HomePage from './HomePage.js'
import EditAccount from "./EditAccount.js";
import PhotoShootDetailView from "./PhotoShootDetailView.js";

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchUser()
  },[])

  const fetchUser = () => (
    fetch('/logged_in')
    .then(response => {
      if(response.ok){
        response.json()
        .then(data =>{
          setUser(data)
        })
      } else {
        setUser(null)
      }
    })
  )

  const updateUser = (user) => setUser(user)

  if(!user) return (
    <Routes>
      <Route path="/" element={<Login updateUser={updateUser} />} />
      <Route path="/createAccount" element={<CreateAccount updateUser={updateUser} />} />
    </Routes>
  )

  return(
    <>
    <Routes>
      <Route path="/" element={<HomePage updateUser={updateUser} user={user} />} />
      <Route path="/photo_shoots/:id" element={<PhotoShootDetailView updateUser={updateUser}/>} />
      <Route path="/edit_account" element={<EditAccount updateUser={updateUser} user={user} />} />
    </Routes>
    </>
  )
}

export default App;
