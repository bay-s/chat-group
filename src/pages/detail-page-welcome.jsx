import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppContext } from '../App'
import img from '../img/cv.png'
import { getServerDetail } from './get-data'
import { insertChat } from './insert-data'
import ModalCreateGroup from './modal-create-group'
import Sidebar from './sidebar'
import SidebarDetail from './sidebar-detail'
import WelcomePage from './welcome-page'


const DetailPageWelcome = () => {
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
<WelcomePage  data={server}/>
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

export default DetailPageWelcome;