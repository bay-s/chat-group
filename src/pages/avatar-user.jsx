import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import akun from '../img/akun.jpg'

const AvatarUser = () => {
   const {value} = useContext(AppContext)
    return(

<section className='is-flex align-center justify-between gap-1 p-2 has-background-black' id='avatar-container'>
<div className='is-flex align-center gap-1 p-2' id='user-avatar'>
<Link className='is-title is-size-6 txt-white' to={`/profiles/${value.data.user_id}`}>
<figure class="image is-24x24">
  <img class="is-rounded" src={!value.data.avatar ? akun : value.data.avatar} />
</figure>
</Link>
<Link className='is-title is-size-6 txt-white' to={`/profiles/${value.data.user_id}`}>{value.data.fullname}</Link>
</div>
  <Link to={`/profiles/${value.data.user_id}`} class="txt-white is-bold is-size-4 p-2"  >
  <i class="fa fa-cog" aria-hidden="true"></i>
   </Link>
 </section>
    )
}

export default AvatarUser;

