import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import akun from '../img/upload.png'

const UploadAvatars = ({img,ImageChange,avatar}) => {
  
      return(
 <div class="field is-flex flex-column gap-1 mx-auto">
        <figure class="image is-128x128 avatar is-relative">
        <img class="is-rounded edit-image h-100 dash is-clickable" src={img !== '' ? img : !avatar ? akun : avatar}  alt="profile"/>
<input class="file-input" type="file" name="resume" onChange={ImageChange}/>
        </figure>
</div>
    
                )
}

export default  UploadAvatars;

