import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import ErrorMessage from './error-message'
import { createServer, getPublicUrl, removeImages, UpdateBanner, UploadThumbnail } from './insert-data'
import UploadAvatar from './upload-avatar'


const ModalForm = ({removeServer,server}) => {
 const {value} = useContext(AppContext)
 const [message, setMessage] = useState({
  pesan: "",
  isError: false,
  sukses: false
});

 const [images,setImages] = useState({
  imgName:'',
  imgUrl:'',
  imgUpload:'',
  isUpload:false,
  hide:false,
  title:''
 })


const ImageChange = event => {
  if (event.target.files && event.target.files[0]) {
    let img = event.target.files[0];
    const randName =  (Math.random() + 1).toString(36).substring(3);
    const imgStr = img.name.split(".")
    const names = `${randName}.${imgStr[1]}`
    setImages({...images ,
      imgUpload: URL.createObjectURL(img),
      imgUrl:img,
      hide:true,
      imgName:`${randName}.${imgStr[1]}`
       }) 
    }
};

const handlerChange = (e) => {
  const {name,value} = e.target
  setImages({...images,
   [name]:value
   })
}

const uploadImage = async (images,names) => {
  const data = await  UploadThumbnail(images,names)    
  return data.path
}

const getPublicUrls = async (id,url) => {
  const data = await getPublicUrl(id,url);
  if(data){
   console.log(data);
    setImages({
      ...images,
      imgUrl:data
    });
  }

 }

 const removeImage = async (e) => {
  e.preventDefault()
  setImages({...images ,
    imgUpload:'',
    hide:false,
     })

   const data = removeImages(images)
 }


const submitForm = async (e) => {
  e.preventDefault()
  setImages({...images ,
    isUpload:true
     })
  if(!images.title){
    errMessage('Title are required')
    return
  }
  const create = await createServer(images,value.data.user_id,server)
  const uploadImg = await uploadImage(images.imgUrl,images.imgName)
  if(create.error) errMessage(create.pesan)
  else{
  console.log(uploadImg);
  console.log("^ test");
  const url = getPublicUrls(create.data[0].id,uploadImg)
 UpdateBanner(create.data[0].id,url)
  successMessage(create)
   }
}

  // ERR MESSAGE
  const errMessage = (msg) =>{
    setMessage({ ...message, 
      pesan:msg,
      isError: true,
      sukses: false,
    });
  setImages({...images ,
      isUpload:false
  })
  }

// SUCCESS MESSAGE
  const successMessage = (args) =>{
    setMessage({ ...message, 
      pesan:args.pesan,
      isError:args.error,
      sukses: true,
    });   
  }

    return(
<form class="modal-card" onSubmit={submitForm }>
        <header class="modal-card-head align-start">
         <div className='is-flex flex-column gap-1'>
         <p class="modal-card-title is-title text-center is-bold is-size-5">Customize your server</p>
         <p className='lh-base  text-center px-5'>
         Give your new server a personality with a name and an icon. You can always change it later.
         </p>
         </div>
          <button class="delete" aria-label="close"></button>
        </header>

<section class="modal-card-body is-flex flex-column gap-2">


<UploadAvatar ImageChange={ImageChange} img={images.imgUpload}/>

<div class="field">
  <label class="label is-title">SERVER NAME</label>
  <div class="control">
    <input class="input no-border has-background-white-ter is-title" type="text"  name='title' onChange={handlerChange }/>
  </div>
</div>

<ErrorMessage pesan={message.pesan} isError={message.isError} sukses={message.sukses}/>

</section>

<footer class="modal-card-foot is-flex justify-between">
      <Link to='/' className='txt-dark' onClick={removeServer}>Back</Link>
     {
      !images.isUpload ? <button class="button is-link " >Create</button>
      :  <a href='#' class="button is-link is-loading" disabled>Create</a>
     }
</footer>

</form>
    )
}

export default ModalForm