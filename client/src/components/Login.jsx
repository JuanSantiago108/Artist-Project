import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState([])

    const changeHandler = (e) => {
        let { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/login`, user, { withCredentials: true })
            .then(res => navigate("/users"))
            .catch(err => {
                const errorResponse = err.response.data.errors;
                const errorArr = []
                console.log(err)
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                    setErrors(errorArr);
                }
            })
    }

    return (
        <div className='container w-75 border-light border'>
            <form className='row g-5' onSubmit={submitHandler}>
                {errors.map((err, index) => <p key={index}>{err}</p>)}

                <h1>Login</h1>

                <div className='col-md-6'>
                    <label class="form-label">Email</label>
                    <input className="form-control" type="text" name="email" value={user.email} onChange={changeHandler} />
                </div>

                <div className='col-md-6'>
                    <label class="form-label">Password</label>
                    <input className="form-control" type="password" name="password" value={user.password} onChange={changeHandler} />
                </div>
                <div className="col-12">
                <button className='btn  btn-success'> Login </button>
                </div>
            </form>
        </div>
    )
}

export default Login
