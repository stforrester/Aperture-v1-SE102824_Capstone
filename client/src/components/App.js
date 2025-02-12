import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Login from './Login.js'

function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate();

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

  if(!user) return (
    <Routes>
      <Route path="/login" element={<Login user={user}/>} />
      <Route path="/createAccount" element={<CreateAccount user={user}/>} />
    </Routes>
  )

  return(
    <></>
  )
}

export default App;
