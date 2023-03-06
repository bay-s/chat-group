import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../supabase-config'
import { getServerDetail, getUserServer } from './get-data'
import { AppContext } from '../App'
import img from '../img/no-post.jpeg'

const Sidebar = ({openModal,id}) => {
 const [server,setServer] = useState([])
 const [serverDetails,setServerDetails] = useState([])
 const {value} = useContext(AppContext)
 useState(() => {
  const getMyServer = async () => {
    const data = await getUserServer(value.data.user_id)
    if(!data.error) {
      console.log(data.data);
      setServer(data.data)
    }
  }
  getMyServer()
  serverDetail()
 },[server])

  async function serverDetail(){
  const myServer = await  getServerDetail(id)
  if(!myServer.error){
   setServerDetails(myServer.data)
   console.log(myServer.data);
  }
}

  const Logout = async e => {
    e.preventDefault()
    const { error } = await supabase.auth.signOut()
    console.log(error);
  }
    return(
        
<aside className='sidebar-fixed border-r has-background-black'>
<div className='is-flex flex-column justify-arround h-100 p-5 align-center' id='sidebar-scroll'>
   <Link class="txt-white is-bold is-size-4" to="/">
     <i class="fa fa-home" aria-hidden="true"></i>
   </Link>

<ul className='is-flex flex-column align-center gap-2 my-5'>
{
serverDetails.length < 1 ? ""
  : serverDetails.map(item => {
    return   <li className={item.creator_id === value.data.user_id ? 'hide' : 'has-tooltip-right'} data-tooltip={item.server_name}>
<Link to={`/channel/${item.id}`}>
<figure class="image is-24x24 avatar">
  <img  class="is-rounded" src={!item.server_banner ? img : item.server_banner } />
</figure>
</Link>
 </li>
  })
}
{
  server.length < 1 ? ""
  : server.map(item => {
    return   <li className='has-tooltip-right' data-tooltip={item.server_name}>
<Link to={`/channel/${item.id}`}>
<figure class="image is-24x24 avatar">
  <img  class="is-rounded" src={!item.server_banner ? img : item.server_banner } />
</figure>
</Link>
 </li>
  })
}
  <li className='has-tooltip-right' data-tooltip="Notification">
  <a class="txt-white is-bold is-size-4 links"  href="https://bulma.io">
  <i class="fa fa-bell" aria-hidden="true"></i>
  </a>
 </li>
<div>
<li>
  <Link to='/channel/me' class="txt-white is-bold is-size-4 has-tooltip-right  links" data-tooltip="Direct Message" >
  <i class="fa fa-commenting" aria-hidden="true"></i>
   </Link>
 </li>
</div>
 <li>
  <a class="txt-white is-bold is-size-4 has-tooltip-right  links" data-tooltip="Setting" href="https://bulma.io">
  <i class="fa fa-cog" aria-hidden="true"></i>
   </a>
 </li>
</ul>

<ul className='is-flex flex-column gap-2 my-5'>
<li>
  <a class="txt-white is-bold is-size-4 has-tooltip-right  links" data-tooltip="Add Server"  onClick={openModal}>
  <i class="fa fa-plus txt-white is-size-4" aria-hidden="true"></i>
   </a>
 </li>
 <li>
<a class="txt-white is-bold is-size-4  links"  onClick={Logout}>
<i class="fa fa-sign-out" aria-hidden="true"></i>
</a>
 </li>
 </ul>

 </div>
</aside>
    )
}

export default Sidebar