
import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'


const Main = () => {



    return (
        <div className = 'text-white bg-dark d-flex'>
            <div>
                <Login />
            </div>
            <div>
                <Register />
            </div>
        </div>
    )
}

export default Main
