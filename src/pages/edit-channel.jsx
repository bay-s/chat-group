import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import EditChannelForm from './edit-channel-form'
import EditSidebar from './edit-channel-sidebar'
import { getServerDetail} from './get-data'


const EditChannel = () => {
    const [server,setServer] = useState([])
    const {id} = useParams()

    useEffect(() => {
     const getServer = async () => {
       const myServer = await  getServerDetail(id)
       if(!myServer.error){
        setServer(myServer.data[0])
        console.log(myServer.data[0]);
       }
     }
     getServer()
    },[])
    return(
<div className='container is-fullhd' id='profile'>

        <section className='columns is-multiline v-100 '>
  <EditSidebar data={server}/>
  <EditChannelForm data={server}/>
        </section>

</div>
    )
}

export default EditChannel