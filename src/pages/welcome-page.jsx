import React, { useContext } from 'react'
import { AppContext } from '../App'
import ChatForm from './chat-form'
import { Link } from 'react-router-dom'


const WelcomePage = ({data}) => {
      const {value} = useContext(AppContext)

      const createMarkup = (text) => {
        return {__html:text.server_description};
       }
    return(
<section className='column  is-relative' id='col-right'>

<header className='border headers sticky-top has-background-black-bis'>
 <h3 className='is-title has-text-primary  is-size-6 is-bold'>#Welcome</h3>
</header>

 <div className='p-4 is-flex flex-column justify-between h-100 '>

 <div className='is-flex flex-column p-4 justify-between'>


<div className='is-flex flex-column gap-2 is-flex-grow-1 txt-white align-start'>
<i class="fa fa-hashtag is-size-2 txt-white" aria-hidden="true"></i>
<h3 className='is-title is-bold is-size-3'>Welcome to {data.server_name} channel</h3>
<div dangerouslySetInnerHTML={createMarkup(data)} className='lh-base has-text-grey-light'/>
{
    data.creator_id === value.data.user_id ? <p className='has-text-grey-light'>This is the start of the #general</p>
: ''
}
{
    data.creator_id === value.data.user_id ? <Link to={`/channel/edit/${data.id}`} className='button is-link is-outlined '>
<i class="fa fa-pencil  pr-3" aria-hidden="true"></i>
Edit Channel
</Link> 
: ''
}
</div>

 </div>

<ChatForm />
 </div>

</section>
    )
}

export default WelcomePage