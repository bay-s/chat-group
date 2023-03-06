import React, { useContext, useState } from 'react'
import { AppContext } from '../App'
import { insertChat } from './insert-data'
import ReactQuill from 'react-quill';
import { getMembers } from './get-data';

const ChatForm = ({data}) => {
      const {value} = useContext(AppContext)
      const [member,setMember] = useState([])
      const [text,setText] = useState('')
 
      useState(() => {
       const getAllMember = async () => {
         const members = await getMembers()
         if(!members.error) setMember(members.data)
       }
       getAllMember()
      },[])
      const handlerChange = (e) => {
        setText(e.target.value)
      }
  
      const submitChat = async (e) => {
       e.preventDefault()
       if(!text){
         alert("INPUT CANT BE EMPTY")
         return
       }
       const args = {
        group_id:data.id,
        user_id:value.data.user_id,
        text:text
       }
       console.log("test 123");
       const datas = await insertChat(args )
       if(!datas.error) console.log(datas.pesan);
       console.log(datas);
      }
   
      const isMember = member.find(({ user_id }) => user_id === value.data.user_id);
    return(
<div class="field comment-input mb-3">
<form class="control has-icons-left has-icons-right" onSubmit={submitChat }>
{
  isMember ? <input class="input has-text-grey-light" type="text" placeholder="Messages" onChange={handlerChange} />
  : <input class="input has-text-grey-light" type="text" placeholder="You dont have permission to send chat in this channel"  disabled/>
}
          
          <span class="icon is-medium is-left">
            <i class="fa fa-plus txt-white is-clickable"></i>
          </span>
          <span class="icon is-medium is-right">
        <button className='no-bg no-border' type='submit'>
        <i class="fa fa-paper-plane-o txt-white is-clickable" aria-hidden="true"></i>
        </button>
          </span>
 </form>

</div>
    )
}

export default ChatForm

