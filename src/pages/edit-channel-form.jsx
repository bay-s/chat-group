import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import akun from '../img/akun.jpg'
import ErrorMessage from './error-message'
import { UpdateServerInfo } from './insert-data'


const EditChannelForm = ({data}) => {

    const [message,setMessage] = useState({
        pesan:'',
        error:'',
        sukses:'',
        isSubmit:false
      })

      const [datas,setDatas] = useState({
        server_name:'',
        server_description:'',
      })
      
      
      useEffect(() => {
        setDatas({...datas,
           server_name:data.server_name,
           server_description:data.server_description
          })
      },[])
      
      const handlerChange = (e) => {
        const {name,value} = e.target
        setDatas({...datas,
            [name]:value
        })
      }
      
      const updateProfiles = async (e) => {
        e.preventDefault()     
        setMessage({
          isSubmit:true
        })
      
        if(!datas.server_description && !datas.server_name) {
          console.log("its okay")
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
    <input class="input has-background-black-ter no-border is-title is-medium" type="text" name='server_name' defaultValue={data.server_name} onChange={handlerChange }/>
  </div>
</div>

<hr className='hr' />

<div class="field">
  <label class="label">Channel topic</label>
  <div class="control">
    <textarea class="textarea has-background-black-ter no-border is-title txt-white" name='server_description' defaultValue={data.server_description} onChange={handlerChange }></textarea>
  </div>
</div>

<hr className='hr' />
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