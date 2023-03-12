import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { AppContext } from '../App'
import ColumnRight from './col-right'
import { getServerDetail, isJoinServer } from './get-data'
import { insertChat } from './insert-data'
import ModalCreateGroup from './modal-create-group'
import ModalJoinServer from './modal-join'
import Sidebar from './sidebar'


const  Detail = () => {
   const [server,setServer] = useState([])
   const {id} = useParams()
   const {value} = useContext(AppContext)
   const [modal,setModal] = useState(false)
   const [modal2,setModal2] = useState(true)
   const {pathname} = useLocation();
   const location = pathname.split("/")[1]
   const [join,setJoin] = useState([])
   const isJoin = join.find(({ user_id }) => user_id === value.data.user_id);
  
 
   useEffect(() => {
    const getServer = async () => {
      const myServer = await  getServerDetail(id)
      if(!myServer.error){
       setServer(myServer.data[0])
       console.log(myServer.data[0]);
      }
    }
    getServer()
    getIsJoin()

   },[])

   const getIsJoin = async () => {
    const datas = await isJoinServer(value.data.user_id)
    if(!datas.error){
      setJoin(datas.data)
      console.log(datas);
    }
   }


   const openModal = (e) => {
    e.preventDefault()
    setModal(!modal)
   }

   const closeModal = (e) => {
    e.preventDefault()
    setModal2(!modal2)
   }


const obj = {
  openModal,
  id,
  location,
  server
 }
    return(
<>

<main  className='container is-fullhd ' >
<Sidebar data={obj}/>
{/* <section className='columns is-multiline  ' id='section-container'>
<SidebarDetail data={server}/>
<ColumnRight  data={server}/>
</section> */}
<ColumnRight  data={server} />

</main>

{/* MODAL CREATE CHANNEL */}
<div class={modal ? "modal is-active" : "modal"}>
  <div class="modal-background"></div>
  <ModalCreateGroup />
  <button class="modal-close is-large" aria-label="close" onClick={openModal}></button>
</div>

{/* MODAL JOIN SERVER */}
{
  value.data.user_id === server.creator_id ? ""
  : isJoin ? "" :
  <div class={modal2 ? "modal is-active" : "modal"}>
  <div class="modal-background"></div>
  <ModalJoinServer data={server} join={join} isJoin={isJoin} closeModal={closeModal }/>
  <button class="modal-close is-large" aria-label="close" closeModal={closeModal}></button>
</div>
}
</>
    )

}

export default Detail;