
import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from './avatar'
import AvatarUser from './avatar-user'

const  SidebarDetail = ({data}) => {

    return(
<article className='shadow-dark column is-3 p-0 is-flex flex-column gap-2 txt-white border-r has-background-black-bis ' id='discover-menu'>

<header className='border headers'>
<h3 className='is-title has-text-primary  is-size-6 is-bold text-center'>{data.server_name}</h3>
</header>
  
<div className='is-flex justify-between flex-column h-100 is-relative'>
<ul className='is-flex flex-column gap-1 align-center'>
    <li className='is-flex align-center gap-2 link w-100'>
     <i class="fa fa-hashtag is-size-5" aria-hidden="true"></i>
     <Link to={`/channel/${data.id}/welcome`}  className='is-size-5 is-title'>Welcome</Link>
    </li>
    <li className='is-flex align-center gap-2 link w-100'>
     <i class="fa fa-hashtag is-size-5" aria-hidden="true"></i>
     <Link to={`/channel/${data.id}/general`} className='is-size-5 is-title'>General</Link>
    </li>
   <hr className='hr' />
  </ul>

<AvatarUser />

</div>

</article>
    )
}

export default SidebarDetail

