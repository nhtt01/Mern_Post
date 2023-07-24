import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
function LoginForm() {
  	// Context
	// const { loginUser } = useContext(AuthContext)


  return (
<>
			<Form className='my-4' >
				{/* <AlertMessage info={alert} /> */}

				<Form.Group>
					<Form.Control
						type='text'
						placeholder='Username'
						name='username'
						required
					
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type='password'
						placeholder='Password'
						name='password'
						required
				
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