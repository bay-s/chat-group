import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import akun from '../img/upload.png'

const UploadAvatar = ({img,ImageChange}) => {
  
      return(
 <div class="field is-flex flex-column gap-1 mx-auto">
        <figure class="image is-128x128 avatar is-relative">
        <img class="is-rounded edit-image h-100 dash is-clickable" src={img !== '' ? img : akun}  alt="profile"/>
<input class="file-input" type="file" name="resume" onChange={ImageChange}/>
        </figure>
</div>
    
                )
}

export default  UploadAvatar;



// <div class="field is-flex flex-column gap-1 mx-auto">
// <figure class="image is-128x128 avatar">
// <img class="is-rounded edit-image h-100" src={img !== '' ? img : akun}  alt="profile"/>
// </figure>
// <div class="file is-small  is-flex flex-column gap-1 is-info">
// <label class="file-label">
// <input class="file-input" type="file" name="resume" onChange={ImageChange}/>
// <span class="file-cta">
{/* <span class="file-icon">
<i class="fa fa-upload"></i>
</span> */}
// <span class="file-label  px-2">
//   Change Image
// </span>
// </span>

// </label>

// </div>
// </div>
