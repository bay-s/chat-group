import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import akun from '../img/akun.jpg'
import supabase from '../supabase-config'

const Avatar = ({id}) => {
    
    const [avatar,setAvatar] = useState([])
     useEffect(() => {
        const getUser = async () => {
            const {data,err} = await supabase.from('users')
            .select()
            .eq('user_id',id)
            if(data){
                setAvatar(data)
                console.log(data);
            }
            if(err) console.log(err);
        }
        getUser()

    },[])



    return(
avatar.length < 1 ? "" : avatar.map(m => {
        return <div className='is-flex align-center gap-1 ' key={avatar}>
        <Link to={`/store/${m.username}`} >
        <figure class="image is-32x32">
        <img class="is-rounded edit-image h-100" src={!m.avatar ? akun : m.avatar} alt="profile" />
        </figure>
        </Link>
        <Link to={`/store/${m.username}`} className='txt-white is-size-6 is-title'>{m.username}</Link>
    </div>
    })
    )
}

export default Avatar;



