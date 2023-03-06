import React, { useState } from 'react'
import ModalContent from './modal-content'
import ModalForm from './modal-form'


const ModalCreateGroup = () => {
   const [server,setServer] = useState('')

   const chooseServer = (e) => {
    e.preventDefault()
    const cat = e.target.dataset.category
    console.log(cat);
    setServer(cat)
   }

   const removeServer = (e) => {
    e.preventDefault()
    setServer('')
   }
    return(
  server === "" ? <ModalContent chooseServer={chooseServer}/>
: <ModalForm removeServer={removeServer} server={server}/>
    )
}

export default ModalCreateGroup