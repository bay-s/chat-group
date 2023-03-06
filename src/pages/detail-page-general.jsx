import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppContext } from '../App'
import img from '../img/cv.png'
import ColumnLeft from './col-left'
import ColumnRight from './col-right'
import DiscoverChannel from './discover-channel'
import DiscoverMenu from './discover-menu'
import { getServerDetail } from './get-data'
import { insertChat } from './insert-data'
import ModalCreateGroup from './modal-create-group'
import Sidebar from './sidebar'
import SidebarDetail from './sidebar-detail'
import WelcomePage from './welcome-page'


const DetailPageGeneral = () => {
   const [server,setServer] = useState([])
   const {id} = useParams()
   const [text,setText] = useState('')
   const {value} = useContext(AppContext)
   const [modal,setModal] = useState(false)

   useEffect(() => {
    const getServer = async () => {
      const myServer = await  getServerDetail(id)
      if(!myServer.error){
       setServer(myServer.data[0])
       console.log(myServer.data[0]);
      }
    }
    getServer()
   },[])

   const handlerChange = (e) => {
     setText(e.target.value)
   }

   const submitChat = async (e) => {
    e.preventDefault()
    if(!text){
      alert("INPUT CANT BE EMPTY")
      return
    }
    const data = await insertChat(text,value.user.user_name)
    if(!data.error) alert(data.pesan)
   }

   const openModal = (e) => {
    e.preventDefault()
    setModal(!modal)
   }

    return(
<>

<main  className='container is-fullhd ' >

<Sidebar openModal={openModal} id={id}/>
<section className='columns is-multiline  ' id='section-container'>
<SidebarDetail data={server}/>
<ColumnRight  data={server}/>
</section>



</main>
<div class={modal ? "modal is-active" : "modal"}>
  <div class="modal-background"></div>
  <ModalCreateGroup />
  <button class="modal-close is-large" aria-label="close" onClick={openModal}></button>
</div>
</>
    )

}

export default DetailPageGeneral;