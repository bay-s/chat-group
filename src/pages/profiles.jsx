import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getUserById } from './get-data'
import ProfileInfo from './profile-info'
import ProfileSidebar from './profile-sidebar'


const Profiles = () => {
    const {id} = useParams()
    const [user,setUser] = useState([])
console.log(id);
    useEffect(() => {
    const getUser = async () => {
        const userData = await getUserById(id)
        if(!userData.error){
            console.log(userData.data[0]);
            setUser(userData.data[0])
        }
    }
    getUser()
    },[])
    return(
<div className='container is-fullhd' id='profile'>

        <section className='columns is-multiline v-100'>
 <ProfileSidebar user={user}/>
 <ProfileInfo user={user}/> 
        </section>

</div>
    )
}

export default Profiles