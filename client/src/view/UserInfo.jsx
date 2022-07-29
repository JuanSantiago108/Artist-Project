import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate, Link, useParams } from 'react-router-dom'
import Gallery from '../components/Gallery';
import AddArtForm from '../components/AddArtForm'

const UserInfo = () => {
    const { id } = useParams();
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [instagram, setInstagram] = useState("")
    const [imageList, setImageList] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/getUser/` + id, { withCredentials: true })
            .then(res => {
                setUserName(res.data.userName);
                setEmail(res.data.email);
                setInstagram(res.data.instagram);
                setImageList(res.data.imageList);
            })
            .catch()
    }, [])

    const logoutHandler = () => {
        axios.get(`http://localhost:8000/api/logout`, { withCredentials: true })
            .then(res => navigate("/"))
            .catch()
    }

    const navigate = useNavigate()

    const refreshList = (newId) => {
        setImageList(imageList.filter((eachImage) => eachImage._id === newId))
    }

    return (
        <div className='text-white bg-dark'>

            <div className='d-flex'>
                <Link to="/users"><button className='btn  btn-success p-2 ' >DashBoard</button></Link>
                <button className='btn  btn-success p-2 ' onClick={logoutHandler} > Log Out</button>
            </div>

            <div>
                <h1>User Info</h1>
                <h3> Username : {userName} </h3>
                <h3> Email : {email} </h3>
                <AddArtForm />
            </div>

            <h1 className="fw-light text-center text-lg-start mt-4 mb-0">{userName}'s Gallery</h1>
            
            <Gallery imageList={imageList} updateList={refreshList} />
        </div>
    )
}

export default UserInfo
