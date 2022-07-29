import React from 'react'

const Gallery = (props) => {



    return (
        <div>

            <div className="container">

                <hr className="mt-2 mb-5" />
                <div className="row text-center text-lg-start">



                    {
                        props.imageList.map((image, i) => {
                            return (
                                <div key={i} className="col-lg-3 col-md-4 col-6  " >
                                <a href={image}class="d-block mb-4 h-100">
                                    <img className='img-fluid img-thumbnail' src={image} />
                                    </a>
                                </div>
                            )
                        })
                    }

                </div>
            </div>




        </div>
    )
}

export default Gallery
