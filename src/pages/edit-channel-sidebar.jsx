import React from 'react'

const EditSidebar = () => {

    return(
        <article className='column is-3 has-background-grey-darker border-r h-100  profile-column profile-sidebar'>
        <div className='card no-bg is-flex flex-column gap-1  align-end' id='is-scroll'>
            <h3 className='has-text-grey-lighter is-title'>User Setting</h3>

            <ul className='is-flex flex-column border-butt pb-2'>
               <li>
                   <a href='#' className='has-text-grey-lighter is-title'>My Account</a>
               </li>
               <li>
                   <a href='#' className='has-text-grey-lighter is-title'>Profiles</a>
               </li>
               <li>
                   <a href='#' className='has-text-grey-lighter is-title'>Privacy & Safety</a>
               </li>
               <li>
                   <a href='#' className='has-text-grey-lighter is-title'>Authorized Apps</a>
               </li>
               <li>
                   <a href='#' className='has-text-grey-lighter is-title'>Devices</a>
               </li>
               <li>
                   <a href='#' className='has-text-grey-lighter is-title'>Connection</a>
               </li>
            </ul>
            
        </div>
     </article>

    )
}

export default EditSidebar