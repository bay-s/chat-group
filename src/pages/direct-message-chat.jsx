import React, { useEffect, useState } from 'react'
import ChatForm from './chat-form'
import { getSenderDirectMessage,  getUserById} from './get-data'
import timeDifference from './timestamp'
import akun from '../img/akun.jpg'
import { approveJoinGroup } from './insert-data'
import supabase from '../supabase-config'

const DirectMessageChat = ({id}) => {
    const [chat,setChat] = useState([])
    const [user,setUser] = useState([])
    const [open,setOpen] = useState(false)

    useEffect(() => {
        const getChat = async () => {
            const datas = await getSenderDirectMessage(id)
            console.log(datas);
            if(!datas.error){
                setChat(datas.data)
            }
          }
          getChat()
          getUser()
    },[id])

    const getUser = async () => {
        const users = await getUserById(id)
        if(!users.error){
            setUser(users.data[0])
            console.log(users.data[0]);
        }
    }

    const openDropdown = (e) => {
        e.preventDefault()
        setOpen(!open)
    }

  const approveJoin = async (e) => {
    e.preventDefault()
    const value = e.target.dataset.approve
    const did = e.target.dataset.id
    const join = await approveJoinGroup(user.user_id,Boolean(value))
    setOpen(!open)
    if(!join.error){
    alert(join.pesan)
    const deletes = await deleteMsg(did) 
    console.log(deletes);
    window.location.reload()
    }
  }

const deleteMsg = async (did) => {  
const ids = parseInt(did)
const { error } = await supabase
.from('direct-message')
.delete()
.eq('id', did)
 if(error) console.log(error);
}
    return(
<section className='column is-relative p-0 txt-white border-r has-background-black-bis' id='col-right'>
<header className='border headers sticky-top has-background-black-bis'>
 <h3 className='is-title has-text-primary  is-size-5 is-bold'>{
  typeof user === 'undefined' ? ''  : user.username
 }</h3>
</header>

 <div className='is-flex flex-column justify-between h-100 '>

 <div className='p-4 is-flex flex-column justify-between' id='chat-box'>

<article className='is-flex flex-column gap-1 '>
{
    chat.length < 1 ? ""
    : chat.map(item => {
        console.log(item)
        return <section className='is-flex gap-2 align-center border-top py-2'>
        <figure class="image is-48x48">
        <img class="is-rounded edit-image h-100" src={typeof user === 'undefined' ? akun : !user.avatar ? akun : user.avatar} alt="profile" />
        </figure>
 <div className='is-flex flex-column w-100'>
     <div className='is-flex justify-between py-2 align-center '>
      <div className='is-flex align-center gap-1'>
      <h3 className='is-size-7 txt-nowrap txt-white'>{typeof user === 'undefined' ? '' : user.username}</h3>
      <h3 className='is-size-7 txt-nowrap has-text-grey-light'>{timeDifference(item.created_at)}</h3>
     </div>
 
<div class={open ? "dropdown is-active is-right" : 'dropdown'}>
  <div class="dropdown-trigger">
    <i class="fa fa-ellipsis-h txt-white is-clickable" aria-hidden="true" onClick={ openDropdown}></i>
  </div>
  <div class="dropdown-menu option" id="dropdown-menu" role="menu">
    <div class="dropdown-content has-background-black">
    {
      item.type === 'join' ? <>
      <a href="#" class="dropdown-item is-title has-text-primary" data-id={item.id} data-approve={true} onClick={approveJoin}>
        Approve
      </a>
      <a href="#" class="dropdown-item is-title has-text-danger" data-id={item.id} data-approve={false} onClick={approveJoin}>
       Reject
      </a>
      </> : ""
    }

      <a href="#" class="dropdown-item  is-title has-text-danger">
        Delete messages
      </a>
    </div>
  </div>
</div>
     </div>
     <p className='txt-white lh-base'>{item.message}</p>
</div>

</section> 
    })
}

</article>
 </div>

<ChatForm />
 </div>

</section>
    )
}

export default DirectMessageChat