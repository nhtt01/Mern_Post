import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate();
    
    useEffect(() => {
        navigate("/login");
    }, [navigate]);
}

export default Landing