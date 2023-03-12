import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import ErrorMessage from './error-message'
import { UpdateUserProfile } from './insert-data'


const ModalEditPhone = ({closeModal}) => {
  const {value} = useContext(AppContext)
  const [args,setArgs] = useState({
    phone:''
  })

  useEffect(() => {
   setArgs({...args,
   phone:value.data.phone
     })

  },[])

  const [message, setMessage] = useState({
    pesan: "",
    isError: false,
    sukses: false,
    isSubmit:false,
  });
  

  const updatePhone = async (e) => {
    e.preventDefault()
    setMessage({...message,
        isSubmit:true,
         })
    const test = {
      phone:`08${args.phone}`
    }  
    const updates = await UpdateUserProfile(value.data.user_id,test)
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
            console.log(value);
            setArgs({...args,
             [name]:value
             })
          }
         
return(
<form class="modal-card forms" onSubmit={ updatePhone }>

<header class="modal-card-head align-start has-background-grey-darker no-border">
<button class="delete navbar-end p-2" aria-label="close" onClick={closeModal}></button>
</header>

<section class="z-5 shadow modal-card-body is-flex flex-column gap-2 has-background-grey-darker">

<div className='is-flex flex-column gap-1 align-center txt-white'>
<h3 className='is-title is-size-4'>Enter your phone number</h3>
<p className='lh-base txt-small has-text-light'>You will receive text message with verivication code</p>
</div>

<div class="field is-horizontal ">
  <div class="field-body  ">
    <div class="field is-expanded">
      <div class="field has-addons">
        <p class="control">
          <a class="button is-static no-border has-background-black-bis txt-white">
            +62
          </a>
        </p>
        <p class="control is-expanded">
          <input class="input has-background-black" type="tel" name='phone' placeholder="Your phone number" defaultValue={value.data.phone}  onChange={handlerChange }/>
        </p>
      </div>
      <p class="help">Do not enter the first zero</p>
    </div>
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

export default ModalEditPhone