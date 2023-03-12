import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { Link} from 'react-router-dom'
import akun from '../img/akun.jpg'
import ErrorMessage from './error-message'
import { UpdateServerInfo } from './insert-data'
import ReactQuill from 'react-quill';

const EditChannelForm = ({data}) => {

    const [message,setMessage] = useState({
        pesan:'',
        error:'',
        sukses:'',
        isSubmit:false
      })
       
      const [quill,setQuill] = useState('')
      const [name, setName] = useState('')
      
      const quillRef = useRef(null)
      const nameRef = useRef(null)

      useEffect(() => {
        setQuill(data.server_description)
        setName(data.server_name)
      },[])
      
      const handlerChange = (e) => {
        setName(nameRef.current.value)
        setQuill(quillRef.current.value)
   
      }
      
      const updateProfiles = async (e) => {
        e.preventDefault()     
        setMessage({
          isSubmit:true
        })
      
        if(!name && !quill) {
          console.log("its okay")
        }
       const datas = {
       server_name:name,
       server_description:quill
       }
        const update = await UpdateServerInfo(data.id,datas)
        if(!update.error) successMsg(update.pesan)
        else errorMsg(update.pesan)
      }
      
      const successMsg = (pesan) => {
        setMessage({
          pesan:pesan,
          error:false,
          sukses:true,
          isSubmit:false
        })
      }
      
      const errorMsg = (error) => {
        setMessage({
          pesan:`Something wrong ${error}`,
          error:true,
          sukses:false,
          isSubmit:false
        })
      }
      
    return(
<section className='column is-9 has-background-grey-dark profile-column  profile-info'>
           
<article className='columns is-multiline px-5 mx-auto'>
 <div className='column is-9 '>
<form className='is-flex flex-column gap-2' id='edit-form' onSubmit={updateProfiles}>
<h4 className='is-title txt-white is-bold is-size-5'>Overview</h4>
<div class="field">
  <label class="label">Channel Name</label>
  <div class="control">
    <input class="input has-background-black-ter no-border is-title is-medium" type="text" ref={nameRef} name='server_name' defaultValue={data.server_name} onChange={handlerChange }/>
  </div>
</div>

<hr className='hr' />

<div class="field ">
  <label class="label">Channel topic</label>
  <div class="control ">
  <ReactQuill ref={quillRef} theme="snow" value={quill} onChange={handlerChange} name='quill'   />
  </div>
</div>


<ErrorMessage pesan={message.pesan} isError={message.isError} sukses={message.sukses}/>

{
    message.isSubmit ? <a href='#' className='button is-link  pb-1 is-loading' disabled>Save</a>
    : <button className='button is-link  pb-1'>Save</button>
}

<hr className='hr ' />
                </form>
             </div>
             <div className='column is-3'>
             <Link to={`/channel/${data.id}`} class="delete p-5 is-fixed navbar-end" aria-label="close"></Link>
             </div>
           </article>
</section>
  
    )
}

export default EditChannelForm