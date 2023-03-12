import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import ErrorMessage from './error-message'
import { UpdateUserProfile } from './insert-data'


const ModalEditUsername = ({closeModal}) => {
  const {value} = useContext(AppContext)
  const [args,setArgs] = useState({
    username:''
  })

  useEffect(() => {
   setArgs({...args,
    username:value.data.username
     })

  },[])

  const [message, setMessage] = useState({
    pesan: "",
    isError: false,
    sukses: false,
    isSubmit:false,
  });
  

  const updateUsername = async (e) => {
    e.preventDefault()
    setMessage({...message,
        isSubmit:true,
         })
    
    const updates = await UpdateUserProfile(value.data.user_id,args)
    if(!updates.error){
        successMessage(updates)
    }else errMessage(updates.pesan)
   }
        // ERR MESSAGE
        const errMessage = (msg) =>{
            setMessage({ ...message, 
              pesan:msg,
              isError: true,
              sukses: false,
              isSubmit:false
            })
          }
        
        // SUCCESS MESSAGE
          const successMessage = (args) =>{
            setMessage({ ...message, 
              pesan:args.pesan,
              isError:args.error,
              sukses: true,
              isSubmit:false
            });   
          }
    
          const handlerChange = (e) => {
            const {name,value} = e.target
            setArgs({...args,
             [name]:value
             })
          }
          
return(
<form class="modal-card forms" onSubmit={updateUsername }>

<header class="modal-card-head align-start has-background-grey-darker no-border">
<button class="delete navbar-end p-2" aria-label="close" onClick={closeModal}></button>
</header>

<section class="z-5 shadow modal-card-body is-flex flex-column gap-2 has-background-grey-darker">

<div className='is-flex flex-column gap-1 align-center txt-white'>
<h3 className='is-title is-size-4'>Change your username</h3>
<p className='lh-base txt-small has-text-light'>Enter new username</p>
</div>


<div class="field">
<label class="label txt-white">Username</label>
<div class="control">
<input class="input has-background-black-ter" name='username' defaultValue={value.data.username} type="text" onChange={handlerChange } />
</div>
</div>
<ErrorMessage pesan={message.pesan} isError={message.isError} sukses={message.sukses}/>

<div className='is-flex align-center navbar-end gap-2'>
<a href='#' className='txt-white ' onClick={closeModal}>Cancel</a>
{
  message.isSubmit ? <a href='#' className='button is-info is-loading' disabled>Save Changes</a>
  : <button className='button is-link'>Save Changes</button>
}
</div>

</section>
</form>
)
}

export default ModalEditUsername