import React from 'react'
import { Link } from 'react-router-dom'


const NotFound = () => {

    return(
   <div className='container txt-center h-100 mt-6 pt-6' id='container'>
     <div className='is-flex flex-column gap-1 align-center'>
     <h1 className='title is-1 is-bold is-title txt-white'>404 Pages Not Found</h1>
     <Link to='/' className='is-bold is-title has-text-primary is-size-3'>
     <i class="fa fa-arrow-left has-text-primary is-size-3" aria-hidden="true"></i>
     <span> Back to Home</span>
    </Link>
     </div>
   </div>
    )
}

export default  NotFound 