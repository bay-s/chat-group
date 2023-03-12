import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { AppContext } from '../App'
import img from '../img/cv.png'
import ColumnRight from './col-right'
import { getServerDetail } from './get-data'
import { insertChat } from './insert-data'
import ModalCreateGroup from './modal-create-group'
import Sidebar from './sidebar'


const DetailPageGeneral = () => {
   const [server,setServer] = useState([])
   const {id} = useParams()
   const [text,setText] = useState('')
   const {value} = useContext(AppContext)
   const [modal,setModal] = useState(false)
   const {pathname} = useLocation();
   const location = pathname.split("/")[1]
   
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

   const obj = {
    openModal,
    id,
    location,
    server
   }

   console.log(id);
    return(
<>

<main  className='container is-fullhd ' >


<Sidebar data={obj} />
{/* <section className='columns is-multiline  ' id='section-container'>
<SidebarDetail data={server}/>
<ColumnRight  data={server}/>
</section> */}
<ColumnRight  data={server}/>


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