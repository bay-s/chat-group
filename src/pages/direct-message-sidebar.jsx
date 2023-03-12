
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserById } from './get-data'

const DirectMessageSidebar = ({message}) => {
    const [users,setUsers] = useState([])

    useEffect(() => {
      const getUser = async () => {
      
        const user = message.map(async msg => {
          const data = await getUserById(msg.sender_uid)
          if(!data.error){
            console.log(data.data[0]);
             setUsers(data.data[0])
          }
        })
    }

    getUser()
      }, [message])

    return(
<ul className='is-flex flex-column gap-1 align-center'>
    <li className='is-flex align-center gap-2 link w-100'>
     <i class="fa fa-user is-size-5" aria-hidden="true"></i>
     <Link to='/' className='is-size-5 is-title'>Friends</Link>
    </li>
    <li className={users ? 'is-flex align-center gap-2 link w-100' : 'hide' }>
     <i class="fa fa-user is-size-5" aria-hidden="true"></i>
     <Link to={`/message/${users.user_id}`} className='is-size-5 is-title'>{users.username}</Link>
    </li>
</ul>
    )
}

export default DirectMessageSidebar

