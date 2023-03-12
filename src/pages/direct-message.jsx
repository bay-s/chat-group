import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { AppContext } from '../App'
import DirectMessageChat from './direct-message-chat'
import DirectMessageSidebar from './direct-message-sidebar'
import { getAllChat, getDirectMessage } from './get-data'
import ModalCreateGroup from './modal-create-group'
import Sidebar from './sidebar'


const DirectMessage = () => {
   const [chat,setChat] = useState([])
   const [modal,setModal] = useState(false)
   const {value} = useContext(AppContext)
   const {id} = useParams()
   const [message,setMessage] = useState([])
   const {pathname} = useLocation();
   const location = pathname.split("/")[1]
   
   useEffect(() => {
    const getChat = async () => {
      const data = await getAllChat()
      setChat(data.data)
    }
    getChat()
    getMessage()
   },[])

   const getMessage = async () => {
      const messages = await  getDirectMessage(value.data.user_id)
      if(!messages.error){
        setMessage(messages.data)
        console.log(messages.data);
      }
   }

   const openModal = (e) => {
    e.preventDefault()
    setModal(!modal)
   }

   const obj = {
    openModal,
    id,
    location,
    message
   }
    return(
<>

<main  className='container is-fullhd ' >

<Sidebar data={obj} />
{/* <section className='' id='section-container'>
<DirectMessageSidebar  message={message} />
<DirectMessageChat id={id === '@me' ? '' : id}/>
</section> */}
<DirectMessageChat id={id === '@me' ? '' : id}/>


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