import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChromePicker} from 'react-color'
import ErrorMessage from './error-message'
import { getPublicUrl, removeImages, updateUserAvatar, UpdateUserProfile,  uploadUserAvatar } from './insert-data'
import { AppContext } from '../App'
import UploadAvatars from './upload-avatars'


const  ModalEditAvatar = ({closeModal}) => {
  const [color,setColor] = useState('')
  const {value} = useContext(AppContext)
  const [args,setArgs] = useState({
      fullname:'',
      color:''
  })

  useEffect(() => {
    setArgs({...args,
      fullname:value.data.fullname,
      color:value.data.banner
       }) 
  },[])

  const colorChange = (newColor) => {
      setColor(newColor.hex);
      setArgs({...args,
        color:newColor.hex
         }) 
      console.log(newColor.hex);
    };


    const [message, setMessage] = useState({
      pesan: "",
      isError: false,
      sukses: false,
      isSubmit:false,
    });
    
     const [images,setImages] = useState({
      imgName:'',
      imgUrl:'',
      imgUpload:'',
      hide:false,
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
      setArgs({...args,
       [name]:value
       })
    }
    
    const uploadImage = async (images,names) => {
      const data = await  uploadUserAvatar(images,names)    
      return data
    }
    
    const getPublicUrls = async (id,url) => {
      const data = await getPublicUrl(id,url);
      if(data){
       console.log(data);
        setImages({
          ...images,
          imgUrl:data
        });
        return data
      }
    
     }
      
  
     const submitForm = async (e) => {
      e.preventDefault()
      setMessage({...message ,
        isSubmit:true
         })

      const updates = await UpdateUserProfile(value.data.user_id,args)
      const uploadImg = await uploadImage(images.imgUrl,images.imgName)
      console.log(uploadImg);
      if(uploadImg.error) {
      errMessage(updates.pesan)
    }else{
      console.log(uploadImg.data.path);
      console.log("^ test");
      const url = await getPublicUrls(value.data.user_id,uploadImg.data.path)
      const avatars = await updateUserAvatar(value.data.user_id,url)
console.log(url);
console.log(avatars);
      if(avatars.error) errMessage(avatars.pesan)
      else successMessage(updates)
       }
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

return(
<form class="modal-card forms" onSubmit={submitForm}>

<header class='modal-card-head align-start no-border' style={{backgroundColor:!value.data.banner ? 'hsl(0, 0%, 7%)' : value.data.banner}}>
<button class="delete navbar-end p-2" aria-label="close" onClick={closeModal}></button>
</header>

<section class="z-5 shadow modal-card-body is-flex flex-column gap-2 has-background-grey-darker">

<UploadAvatars ImageChange={ImageChange} img={images.imgUpload} avatar={value.data.avatar}/>

<div class="field">
<label class="label txt-white">Fullname</label>
<div class="control">
<input class="input has-background-black-ter" name='fullname' defaultValue={value.data.fullname} type="text" onChange={handlerChange } />
</div>
</div>

<div >
<ChromePicker color={color} onChange={colorChange} />
</div>

<ErrorMessage pesan={message.pesan} isError={message.isError} sukses={message.sukses}/>

</section>

<footer class="modal-card-foot has-background-grey-darker is-flex align-center gap-2">
<a href='#' className='txt-white ' onClick={closeModal}>Cancel</a>
{
  message.isSubmit ? <a href='#' className='button is-info is-loading' disabled>Save Changes</a>
  : <button className='button is-link'>Save Changes</button>
}
</footer>

</form>
)
}

           

export default ModalEditAvatar