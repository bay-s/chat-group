import React from 'react'
import { Link} from 'react-router-dom'
import ProfileCardTop from './profile-card-top'

const ProfileInfo = ({user}) => {
  
    return(
        <article className='column is-9 has-background-grey-dark profile-column  profile-info'>
        <div className='is-flex justify-between align-center  px-6 '>
            <h4 className='is-title is-bold txt-white is-size-5'>My Account</h4>
           <Link to='/' class="delete p-5 is-fixed" aria-label="close"></Link>
          </div>
          
 <div className='column is-10 box no-bg  p-6' id='is-scroll'>
   <ProfileCardTop user={user}/>
  {/* END CARD */}
  <hr className='border-butt' />

  <div className='is-flex flex-column gap-2 align-start'>
  <h4 className='is-title is-bold txt-white is-size-5'>Password and Authentication</h4>
  <button className='button is-link is-small'>Change Password</button>
  <div className='is-flex flex-column gap-1'>
  <h4 className='is-title is-bold has-text-grey-light'>Password and Authentication</h4>
  <p className='is-title is-bold has-text-grey-light is-size-7 lh-base'>
  The replace() method returns a new string with one, some, or all matches of a pattern replaced by a replacement. The pattern can be a string or a RegExp, and the replacement can be a string or a function called for each match. If pattern is a string, only the first occurrence will be replaced. The original string is left unchanged.
  </p>
  </div>
  <button className='button is-link is-small'>Enable Two Factor Auth</button>
  </div>

  <hr className='border-butt' />

  <div className='is-flex flex-column gap-2 align-start'>
  <h4 className='is-title is-bold txt-white is-size-5'>Account Removal</h4>
  <p className='is-title is-bold has-text-grey-light is-size-7 lh-base'>
  The replace() method returns a new string with one, some, or all matches of a pattern replaced by a replacement. The pattern can be a string or a RegExp, and the replacement can be a string or a function called for each match. If pattern is a string, only the first occurrence will be replaced. The original string is left unchanged.
  </p>
 
<div class="buttons">
  <button class="button is-danger is-small">Disabled Account</button>
  <button class="button is-danger is-outlined is-small">Delete Account</button>
</div>

  </div>

</div>
               {/* END COLUMN INNER */}
            </article>
  
    )
}

export default ProfileInfo