import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AddArtForm = () => {
  const [image, setImage] = useState([])



  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.put('http://localhost:8000/api/add', {
      image,
    }, { withCredentials: true })
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }



  return (
    <div >
      <form  onSubmit={onSubmitHandler}>

        <div >

          <label >Add Art :</label>
          <input  type="text" name="image" value={image} onChange={(e) => setImage(e.target.value)} />

          <button className='btn  btn-success p-2 ' type='submit' > Sumbit</button>

        </div>
      </form>
    </div>
  )
}

export default AddArtForm
