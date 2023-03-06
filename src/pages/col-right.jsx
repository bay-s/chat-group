import React, { useEffect, useState } from 'react'
import Avatar from './avatar'
import AvatarUser from './avatar-user'
import ChatForm from './chat-form'
import { getAllChat} from './get-data'
import timeDifference from './timestamp'


const ColumnRight = ({data}) => {
    const [chat,setChat] = useState([])

    useEffect(() => {
        const getChat = async () => {
            const datas = await getAllChat(data.id)
            console.log(datas);
            if(!datas.error){
                setChat(datas.data)
                console.log(datas.data);
            }
          }
          getChat()
    },[chat])
    return(
<section className='column  is-relative ' id='col-right'>

<header className='border headers sticky-top has-background-black-bis'>
 <h3 className='is-title has-text-primary  is-size-6 is-bold'>#General</h3>
</header>

 <div className='p-4  is-flex flex-column justify-between h-100 '>

 <div className='p-4 is-flex flex-column justify-between' id='chat-box'>
<h3 className='is-bold is-title is-size-3 txt-white'>Welcome to {data.server_name} Channel.</h3>

<article className='is-flex flex-column gap-1 '>

{
    chat.length < 1 ? ""
    : chat.map(item => {
        console.log(item)
        return <div className='is-flex flex-column border-top py-2'>
     <div className='is-flex justify-between py-2 align-center'>
        <div className='is-flex align-center gap-1'>
      <Avatar id={item.user_id} />
      <h3 className='is-size-7 txt-nowrap has-text-grey-light'>{timeDifference(item.created_at)}</h3>
     </div>
     <i class="fa fa-ellipsis-h txt-white is-clickable" aria-hidden="true"></i>
     </div>
     <p className='txt-white lh-base px-4'>{item.chat_content}</p>
    </div>
    })
}
</article>
 </div>

<ChatForm data={data}/>
 </div>

</section>
    )
}

export default ColumnRight