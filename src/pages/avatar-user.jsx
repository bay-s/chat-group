import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import akun from '../img/akun.jpg'

const AvatarUser = () => {
   const {value} = useContext(AppContext)
    return(
      <li className='is-flex gap-2 align-center txt-white links' >
      <Link className='is-title is-size-7 txt-white' to={`/profiles/${value.data.user_id}`}>
     <figure class="image is-24x24 avatar">
       <img class="is-rounded" src={!value.data.avatar ? akun : value.data.avatar} />
     </figure>
     </Link>
     <Link className='is-title is-size-6 txt-white' to={`/profiles/${value.data.user_id}`}>{value.data.fullname}</Link>
     </li>
    )
}

export default AvatarUser;

