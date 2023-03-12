import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import { getServerDetail, getUserServer } from './get-data'
import img from '../img/no-post.jpeg'

const SidebarFixedContent = ({id}) => {
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
   
return(
<section id='sidebar-scroll'>
<ul className='is-flex flex-column  gap-2 my-5 '>
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
    return   <li className='is-flex gap-2 align-center txt-white links '>
    <figure class="image is-24x24 avatar">
  <img  class="is-rounded" src={!item.server_banner ? img : item.server_banner } />
</figure>
<Link to={`/channel/${item.id}`} className='txt-white is-title'>
{item.server_name}
</Link>
 </li>
  })
}
<li className='is-flex gap-2 align-center txt-white links ' >
  <i class="fa fa-bell" aria-hidden="true"></i>
  <a class="txt-white is-bold is-title"  href="#">
  Notification
  </a>
 </li>
<li className='is-flex gap-2 align-center txt-white links ' >
<i class="fa fa-commenting" aria-hidden="true"></i>
<Link to={`/message/@me`} class="txt-white is-bold "  >
 Direct Message
</Link>
</li>
<li className='is-flex gap-2 align-center txt-white links ' >
<i class="fa fa-cog" aria-hidden="true"></i>
<Link to={`/message/@me`} class="txt-white is-bold "  >
 Setting
</Link>
</li>
</ul>

</section>

)

}

export default SidebarFixedContent