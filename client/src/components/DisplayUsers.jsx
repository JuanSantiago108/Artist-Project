import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table';



const DisplayUsers = () => {
    const [users, setUsers] = useState(null)
    const navigate = useNavigate()


    useEffect(() => {
        axios.get(`http://localhost:8000/api/allUsers`, { withCredentials: true })
            .then(res => setUsers(res.data))
            .catch(console.log)
    }, [])


    const logoutHandler = () => {
        axios.get(`http://localhost:8000/api/logout`, { withCredentials: true })
            .then(res => navigate("/"))
            .catch()
    }


    const removeFromDom = (userid) => {
        setUsers(users.filter(u => u._id !== userid))

    }

    const deleteObject = (artistid) => {
        axios.delete('http://localhost:8000/api/delete/' + artistid)
            .then(res => {
                removeFromDom(artistid)
                console.log(res)
            })
            .catch(err => console.log(err))
    }


    return (
        <div >
            <nav class="navbar navbar-light bg-dark text-white">
                <div class="container-fluid">
                    <a class="navbar-brand fs-1  text-white">DashBoard</a>

                        <button onClick={logoutHandler} class="btn btn-outline-success" type="submit">Logout </button>

                </div>
            </nav>
            <Table striped bordered hover variant="dark"  >
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Artis Emails</td>
                        <td>Instagram</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user, i) => (
                        <tr key={i}>
                            <td >{user.userName} </td>
                            <td>{user.email}</td>
                            <td>{user.instagram}</td>
                            <Link to={`/userInfo/${user._id}`}><button type='submit'>View Art</button></Link>
                            <button onClick={() => deleteObject(user._id)}> Delete</button>
                        </tr>
                    ))
                    }
                </tbody>

            </Table>
        </div>
    )
}

export default DisplayUsers
