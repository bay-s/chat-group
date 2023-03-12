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


const Home = () => {
   const [chat,setChat] = useState([])
   const [text,setText] = useState('')
   const [modal,setModal] = useState(false)
   const {value} = useContext(AppContext)

   useEffect(() => {
    const getChat = async () => {
      const data = await getAllChat()
      setChat(data.data)
    }
    getChat()
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

   const obj = {
    openModal
   }
    return(
<>

<main  className='container is-fullhd ' >

<Sidebar  data={obj} />
{/* <section className='' id='section-container'>
<DiscoverMenu />
<DiscoverChannel />
</section> */}
<DiscoverChannel />


</main>
<div class={modal ? "modal is-active" : "modal"}>
  <div class="modal-background"></div>
  <ModalCreateGroup />
  <button class="modal-close is-large" aria-label="close" onClick={openModal}></button>
</div>
</>
    )

}

export default Home;