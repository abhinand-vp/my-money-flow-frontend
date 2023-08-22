import { Button } from '@mui/material'
import Cookies from 'js-cookie';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {
    const navigate = useNavigate()
    useEffect(() => {
        Cookies.remove('token');
    }, [])

    return (
        <div className='pageNotFound'>
            <div>You entered a wrong Page</div>
            <Button variant='contained' onClick={() => navigate("/login")}>Back to Login Page</Button>
        </div>
    )
}

export default PageNotFound