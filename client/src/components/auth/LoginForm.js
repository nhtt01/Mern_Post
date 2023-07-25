import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext'
function LoginForm() {
	const [loginForm,setLoginForm] = useState({
		username:'',
		password:''
	});
	const {username ,password} = loginForm;
	const onChangeLoginForm = (e)=>{
		setLoginForm({...loginForm,[e.target.name]:e.target.value})
	}
	
  return (
<>
			<Form className='my-4' >
				<Form.Group>
					<Form.Control
						type='text'
						placeholder='Username'
						name='username'
						required
						value={username}
						onChange={onChangeLoginForm}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type='password'
						placeholder='Password'
						name='password'
						required
						value={password}
						onChange={onChangeLoginForm}
					/>
				</Form.Group>
				<Button variant='success' type='submit'>
					Login
				</Button>
			</Form>
			<p>
				Don't have an account?
				<Link to='/register'>
					<Button variant='info' size='sm' className='ml-2'>
						Register
					</Button>
				</Link>
			</p>
		</>
  )
}

export default LoginForm