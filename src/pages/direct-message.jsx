import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import img from '../img/cv.png'
import ColumnLeft from './col-left'
import ColumnRight from './col-right'
import DiscoverChannel from './discover-channel'
import DiscoverMenu from './discover-menu'
import { getAllChat } from './get-data'
import { insertChat } from './insert-data'
import ModalCreateGroup from './modal-create-group'
import Sidebar from './sidebar'


const DirectMessage = () => {
   const [chat,setChat] = useState([])
   const [modal,setModal] = useState(false)
   const {value} = useContext(AppContext)

   useEffect(() => {
    const getChat = async () => {
      const data = await getAllChat()
      setChat(data.data)
    }
    getChat()
   },[])

   const openModal = (e) => {
    e.preventDefault()
    setModal(!modal)
   }

    return(
<>

<main  className='container is-fullhd ' >

<Sidebar openModal={openModal}/>
<section className='columns is-multiline  ' id='section-container'>
<DiscoverMenu />
<DiscoverChannel />
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

export default DirectMessage;