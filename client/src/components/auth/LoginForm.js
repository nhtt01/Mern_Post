import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link,useNavigate  } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext'
function LoginForm() {
	// Context
	const {loginUser} = useContext(AuthContext);
	// Router 
	const navigate = useNavigate();
	// Local state
	const [loginForm,setLoginForm] = useState({
		username:'',
		password:''
	});
	const {username ,password} = loginForm;
	const onChangeLoginForm = (e)=>{
		setLoginForm({...loginForm,[e.target.name]:e.target.value})
	}
	const login = async event =>{
		event.preventDefault();
		try {
			const loginData =  await loginUser(loginForm);
			console.log(loginData);	
			if(loginData.success){
				navigate('/dashboard');	
			}
		} catch (error) {
			console.log(error);
		}
		
	}
  return (
<>
			<Form className='my-4' onSubmit={login} >
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