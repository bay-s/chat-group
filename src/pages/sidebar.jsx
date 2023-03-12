import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../supabase-config'
import AvatarUser from './avatar-user'
import DirectMessageSidebar from './direct-message-sidebar'
import SidebarChannel from './sidebar-channel'
import SidebarFixedContent from './sidebar-fixed-content'


const Sidebar = ({data}) => {

const Logout = async e => {
    e.preventDefault()
    const { error } = await supabase.auth.signOut()
    console.log(error);
  }
console.log(data.location);
let component;
switch(data.location){
  case 'channel':
    component = <SidebarChannel data={data.server}/>;
    break;
    case 'message':
    component = <DirectMessageSidebar message={data.message}/>;
    break;
  default:
    component = <SidebarFixedContent id={data.id} /> ;
}
    return(
        
<aside className='sidebar-fixed border-r has-background-black'>

<div className='is-flex flex-column justify-arround h-100 ' >
 <header className='is-fixed-top is-flex gap-2 align-center txt-white links'>
 <i class="fa fa-home is-size-5" aria-hidden="true"></i>
 <Link class="txt-white is-bold is-title" to="/">
     Home
 </Link>
 </header>

{component}
{/* USER SETTING */}
<ul className='is-flex flex-column gap-2 py-5 border-top'>
 <li className='is-flex gap-2 align-center txt-white links' >
 <i class="fa fa-plus txt-white " aria-hidden="true"></i>
<Link to={`/message/@me`} class="txt-white is-bold "  onClick={data.openModal}>
Add Server
</Link>
</li>
<li className='is-flex gap-2 align-center txt-white links' >
 <i class="fa fa-sign-out" aria-hidden="true"></i>
<Link to={`/message/@me`} class="txt-white is-bold "  onClick={Logout}>
Log out
</Link>
</li>
<AvatarUser />
</ul>
{/* end user setting */}
</div>
 
</aside>
    )
}

export default Sidebar