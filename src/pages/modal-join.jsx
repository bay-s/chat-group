import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import ErrorMessage from './error-message'
import { isJoinServer } from './get-data'
import { joinGroup } from './insert-data'
import UploadAvatar from './upload-avatar'


const  ModalJoinServer= ({data,closeModal,isJoin}) => {
 const {value} = useContext(AppContext)
 

 const joinServer = async (e) => {
  e.preventDefault()
  const args = {
    user_id:value.data.user_id,
    group_id:data.id,
    creator_id:data.creator_id
  }
  if(isJoin){
    alert("YOU ALREADY")
    return
  }
  const sentJoin = await joinGroup(args,value.data.username)
  if(!sentJoin.error){
    alert(sentJoin.pesan)
  }
}
    return(
<form class="modal-card " onSubmit={ joinServer}>

<header class="modal-card-head align-start has-background-black-bis no-border">
<button class="delete navbar-end p-2" aria-label="close"  onClick={closeModal}></button>
</header>

<section class="z-5 shadow modal-card-body is-flex flex-column gap-2 has-background-black-bis">

<div className='is-flex flex-column gap-1 align-center txt-white'>

<figure class="image is-48x48">
  <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
</figure>
<h3 className='is-title is-size-4'>Welcome to {data.server_name} channel</h3>
{/* {
  isJoin ? <a href='#' className='button is-link is-medium' disabled>Join channel</a>
  : <button className='button is-link is-medium'>Join channel</button>
} */}
<button className='button is-link is-medium'>Join channel</button>
</div>

<Link to={`/channel/${data.id}`} className='has-text-grey-light text-center is-size-7 is-title' onClick={closeModal}>Im just look around</Link>
</section>
</form>
    )
}

export default ModalJoinServer