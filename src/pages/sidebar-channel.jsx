
import React from 'react'
import { Link } from 'react-router-dom'

const  SidebarChannel = ({data}) => {

    return(
<ul className='is-flex flex-column gap-1 align-center'>
    <li className='is-flex align-center gap-2 link w-100'>
     <i class="fa fa-hashtag is-size-5" aria-hidden="true"></i>
     <Link to={`/channel/${data.id}/welcome`}  className='is-size-5 is-title'>Welcome</Link>
    </li>
    <li className='is-flex align-center gap-2 link w-100'>
     <i class="fa fa-hashtag is-size-5" aria-hidden="true"></i>
     <Link to={`/channel/${data.id}/general`} className='is-size-5 is-title'>General</Link>
    </li>
</ul>
    )
}

export default  SidebarChannel

