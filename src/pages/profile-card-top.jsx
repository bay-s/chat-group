import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import akun from '../img/akun.jpg'
import ModalEditAvatar from './modal-edit-avatar'
import ModalEditPhone from './modal-edit-phone'
import ModalEditUsername from './modal-edit-username'

const ProfileCardTop = ({user}) => {
  const [modal,setModal] = useState({
    modalUsername:false,
    modalPhone:false,
    modalProfile:false
  })
 
  const openModal = (e) => {
    e.preventDefault()
    const target = e.target.dataset.target
    if(target === 'profile'){
      setModal({...modal,
        modalProfile:!modal.modalProfile
          }) 
    }else if(target === 'phone'){
      setModal({...modal,
        modalPhone:!modal.modalPhone
          }) 
    }else if(target === 'username'){
      setModal({...modal,
       modalUsername:!modal.modalUsername
         }) 
    }
  }
  const closeModal = (e) => {
    e.preventDefault()
    setModal(!modal)
  }
    return(
<>        
        <div className='cards'>
        <div className='card-top' style={{backgroundColor:!user.banner ? 'hsl(0, 0%, 7%)' : user.banner}}></div>
       
        <div className='has-background-grey-darker p-5'>

        <div className='is-flex justify-between align-center '>

          <div className='is-flex align-center gap-2'>
            <figure class="image is-64x64 avatar">
                <img class="is-rounded" src={!user.avatar ? akun : user.avatar} />
               </figure>
               <h4 className='is-title txt-white is-bold is-size-5'>
                {user.fullname}
               </h4>
          </div>
          
          <button className='button is-link' data-target='profile' onClick={openModal}>Edit Profile</button>
        </div>

        {/* INNER CARD */}
         <div className='box my-5 has-background-grey-dark '>
         <ul className='is-flex flex-column gap-1'>
          <li className='is-flex justify-between align-center '>
            <p className='is-flex flex-column txt-white'>
                <span className='is-title is-bold'>USERNAME</span>
                <span className=' is-title'>{user.username}</span>
            </p>
            <button className='button is-dark' data-target='username' onClick={openModal}>Edit</button>
          </li>
          <li className='is-flex justify-between align-center '>
            <p className='is-flex flex-column txt-white'>
                <span className='is-title is-bold'>EMAIL</span>
                <span className=' is-title'>{user.email}</span>
            </p>
            <button className='button is-dark' disabled>Edit</button>
          </li>
          <li className='is-flex justify-between align-center '>
            <p className='is-flex flex-column txt-white'>
                <span className='is-title is-bold'>PHONE NUMBER</span>
                <span className=' is-title'>
                  {!user.phone  ? 'You havent added phone number yet' : user.phone}
                </span>
            </p>
            <button className='button is-dark' data-target='phone' onClick={openModal}>
            {!user.phone ? 'Add' : 'Edit'}
            </button>
          </li>
         </ul>
         </div>
        {/* INNER CARD */}
        </div>

     </div>


{/* MODAL EDIT USERNAME */}
<div class={modal.modalUsername ? "modal is-active" : "modal"}>
  <div class="modal-background" onClick={closeModal}></div>
  <ModalEditUsername closeModal={closeModal}/>
</div>
{/* END MODAL EDIT USERNAME */}

{/* MODAL EDIT  PHONE */}
<div class={modal.modalPhone ? "modal is-active" : "modal"}>
  <div class="modal-background" onClick={closeModal}></div>
  <ModalEditPhone closeModal={closeModal}/>
</div>
{/* END MODAL EDIT PHONE */}

{/* MODAL EDIT AVATAR */}
<div class={modal.modalProfile ? "modal is-active" : "modal"}>
  <div class="modal-background" onClick={closeModal}></div>
  <ModalEditAvatar closeModal={closeModal}/>
</div>
{/* END MODAL EDIT AVATAR */}
</>
    )
}
export default ProfileCardTop