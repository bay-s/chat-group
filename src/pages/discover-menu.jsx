
import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from './avatar'
import AvatarUser from './avatar-user'

const DiscoverMenu = () => {

    return(
<article className='is-flex flex-column gap-2 txt-white border-r has-background-black-bis ' id='discover-menu'>

<header className='border headers'>
<h3 className='is-title has-text-primary  is-size-6 is-bold'>Discover</h3>
</header>
  
<div className='is-flex justify-between flex-column h-100 is-relative'>
<ul className='is-flex flex-column gap-1 align-center'>
    <li className='is-flex align-center gap-2 link w-100'>
     <i class="fa fa-home is-size-5" aria-hidden="true"></i>
     <Link to='/' className='is-size-5 is-title'>Home</Link>
    </li>
    <li className='is-flex align-center gap-2 link w-100'>
     <i class="fa fa-gamepad is-size-5" aria-hidden="true"></i>
     <Link to='/' className='is-size-5 is-title'>Games</Link>
    </li>
    <li className='is-flex align-center gap-2 link w-100'>
     <i class="fa fa-music is-size-5" aria-hidden="true"></i>
     <Link to='/' className='is-size-5 is-title'>Music</Link>
    </li>
    <li className='is-flex align-center gap-2 link w-100'>
     <i class="fa fa-graduation-cap is-size-5" aria-hidden="true"></i>
     <Link to='/' className='is-size-5 is-title'>Education</Link>
    </li>
    <li className='is-flex align-center gap-2 link w-100'>
     <i class="fa fa-film is-size-5" aria-hidden="true"></i>
     <Link to='/' className='is-size-5 is-title'>Movie</Link>
    </li>
  </ul>


</div>

<AvatarUser />

</article>
    )
}

export default DiscoverMenu

