import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import DropDownHeader from './header-dropdown'
import Cookies from 'js-cookie'


const Header = () => {
   const {value} = useContext(AppContext)


    return(
<header className='headers py-2 navbar is-fixed-top  border no-bg'>
  
<section className='columns is-multiline w-100'>
  <article className='column is-2 border-r text-center'>
  <a class="has-text-info  is-size-3 is-title" href="https://bulma.io">
     Chatbox
  </a>
  </article>
  <article className='column is-4 border-r text-center'>
  <a class="has-text-info  is-size-3 is-title" href="https://bulma.io">
    Message
  </a>
  </article>
  <article className='column is-6 border-r text-center'>
  <a class="has-text-info  is-size-3 is-title" href="https://bulma.io">
    Someone chat
  </a>
  </article>
</section>

</header>
    )
}

export default Header

