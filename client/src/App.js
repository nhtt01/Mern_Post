import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm  from './components/auth/LoginForm'
import RegisterForm  from './components/auth/RegisterForm'
import Landing from './components/layouts/Landing';
import Auth from './views/Auth';
import AuthContextProvider from './contexts/authContext';
import Dashboard from './views/Dashboard';
function App() {
  return (
  <AuthContextProvider>
    <Routes>
    <Route extras path='/' element={<Landing/>}/>
        <Route path='/login' element={<Auth authRoute='login'/>}/>
        <Route path='/register' element={<Auth authRoute='register'/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
  </AuthContextProvider>
  );
}

export default App;
