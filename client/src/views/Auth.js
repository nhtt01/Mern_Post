import React from 'react'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'

function Auth({authRoute}) {
  return (
   <>
    { authRoute==='login' && <LoginForm/>}
    { authRoute==='register' && <RegisterForm/>}
   </>
  )
}

export default Auth