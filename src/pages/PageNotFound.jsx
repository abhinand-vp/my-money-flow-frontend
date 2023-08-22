import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {
    const navigate = useNavigate()
    return (
        <>
        
        <div>You entered a wrong Page</div>
        <Button onClick={()=>navigate("/login")}>Back to Login</Button>
        </>
    )
}

export default PageNotFound