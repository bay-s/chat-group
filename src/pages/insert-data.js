import supabase from "../supabase-config";
import { getUserById } from "./get-data";


export async function insertUserData(id,values){
    console.log(values);
    const {data,error} = await supabase 
    .from('users')
    .insert({
      username:values.username,
      fullname:values.fullname,
      email:values.email,
      user_id:id,
    })
    .select()
    if(error){
      console.log(error.message);
      return {error:true,pesan:`Something wrong ${error.message}`}
    }
    if(data){
      console.log('tes');
      return {error:false,pesan:`Register Success !`,data:data}
    }
}

export async function RegisterAccount(values){
  const { data, error } = await supabase.auth.signUp({
      email:values.email ,
      password:values.password 
    })
  if(error){
  return {error:true,pesan:`Something wrong ${error.message}`}
    }else {
return {error:false,pesan:`Register Success`,data:data}
    }
}

export async function UserLogin(values){
  const { data, error } = await supabase.auth.signInWithPassword({
    email:values.email,
    password:values.password,
  })

  if(error){
   return {error:true,pesan: `Something wrong ${error.message}`}
   }else{
     console.log(data);
     return {error:false,pesan:'Login success',data:data}
   }


}

// UPDATE USER PROFILE
export async function UpdateUserProfile(id,args){
  const { data, error } = await supabase
  .from('users')
  .update({
     username:args.username,
     fullname:args.fullname,
     biodata:args.biodata,
     banner:args.color,
     phone:args.phone
    })
  .eq('user_id',id)
  .select()
   if(error){
    return {error:true,pesan:`Something wrong ${error.message}`}
  }else{
    if(data){
      console.log(data);
      return {error:false,pesan:'Update Profile success',data:data}
    }
  }
}

// CHAT 

export async function insertChat(args){
  const { data, error } = await supabase
  .from('chat-group')
  .insert({
     chat_content:args.text,
     user_id:args.user_id,
     group_id:args.group_id,
    })
  .select()
   if(error){
    return {error:true,pesan:`Something wrong ${error.message}`}
  }else{
    if(data){
      console.log(data);
      return {error:false,pesan:'Update Profile success',data:data}
    }
  }
}

// INSERT GROUP MEMBERS
export async function chatGroupMember(uid,gid){
  const { data, error } = await supabase
  .from('chat-group-member')
  .insert({
    group_id:gid,
    user_id:uid,
    })
  .select()
   if(error){
    return {error:true,pesan:`Something wrong ${error.message}`}
  }else{
    if(data){
      console.log(data);
      console.log('log data group');
      return {error:false,pesan:'Update Profile success',data:data}
    }
  }
}

// CREATE SERVER 
export async function createServer(args,id,cat){
  const { data, error } = await supabase
  .from('chat-server')
  .insert({
    server_name:args.title,
     creator_id:id,
     category:cat,
     total_member:1
    })
  .select()
   if(error){
    return {error:true,pesan:`Something wrong ${error.message}`}
  }else{
    if(data){
      console.log(data);
      const groupMember = await chatGroupMember(id,data[0].id)
      return {error:false,pesan:'Create server success',data:data}
    }
  }
}

// UPLOAD IMAGES
export async function UploadThumbnail(images,names){
  const { data, error} = await supabase.storage
  .from('images')
  .upload(`public/${names}`, images,{
    cacheControl: '604800',
    upsert: false
  })
  if(error){
console.log(error);
  }
  if(data){
   console.log(data);
   return data
  }
}

// UPLOAD IMAGES
export async function uploadUserAvatar(images,names){
  const { data, error} = await supabase.storage
  .from('avatar')
  .upload(`public/${names}`, images,{
    cacheControl: '604800',
    upsert: false
  })
  if(error){
console.log(error);
return {error:true,pesan:`Something wrong ${error.message}`}
  }
  if(data){
   console.log(data);
   return {error:false,pesan:'Update profile success',data:data}
  }
}

// GET URL
export async function getPublicUrl(id,url){
  const { data } = supabase
  .storage.from('avatar')
  .getPublicUrl(url)
  if(data){
    const imgUrl = data.publicUrl;
    console.log(imgUrl);
    console.log(url);
    return imgUrl 
  }

 }

//  UPDATE BANNER SERVER
export async function UpdateBanner(id,url){
  const { data, error } = await supabase
  .from('chat-server')
  .update({server_banner:url})
  .eq('id',id)
  .select()
   if(error){
console.log(error.message);
  }else{
    if(data){
      console.log(data);
    }
  }
}

//  UPDATE  USER AVATAR
export async function updateUserAvatar(id,url){
  const { data, error } = await supabase
  .from('users')
  .update({avatar:url})
  .eq('user_id',id)
  .select()
   if(error){
    return {error:false,pesan:`Something wrong ${error.message}`}
  }else{
    if(data){
      return {error:false,pesan:'Update profile success',data:data}
    }
  }
}

//  REMOVE IMAGES
 export async function removeImages(images){
  const { data, error } = await supabase.storage.from('images')
    .remove([`public/${images.imgName}`])
    if(error)  return {error:false,pesan:`Something wrong ${error.message}`,data:data}
    else {
      console.log(data);
    }

   }


// EDIT SERVER INFO 
export async function UpdateServerInfo(id,args){
  const { data, error } = await supabase
  .from('chat-server')
  .update({
   server_name:args.name,
   server_description:args.server_description
  })
  .eq('id',id)
  .select()
   if(error){
console.log(error.message);
return {error:false,pesan:`Something wrong ${error.message}`}
  }else{
    if(data){
      console.log(data);
      return {error:false,pesan:'Update server success',data:data}
    }
  }
}

// SEND JOIN REQUEST
export async function joinGroup(args,name){
  const { data, error } = await supabase
  .from('join-group')
  .insert({
     user_id:args.user_id,
     creator_id:args.creator_id,
     group_id:args.group_id,
    })
  .select()
   if(error){
    return {error:true,pesan:`Something wrong ${error.message}`}
  }else{
    if(data){
      const args = {
        sender_id:data[0].user_id,
        receive_id:data[0].creator_id,
        type:'join'
      }
      const msg = `User ${name} want to join this channel !`
      console.log(args);
      const message = await sendMessage(args,msg)
      console.log(message);
      return {error:false,pesan:'Sent join success',data:data}
    }
  }
}

// DIRECT MESSAGE
export async function sendMessage(args,msg){
  const { data, error } = await supabase
  .from('direct-message')
  .insert({
    sender_uid:args.sender_id,
    receive_uid:args.receive_id,
    message:msg,
    type:args.type
    })
  .select()
   if(error){
    return {error:true,pesan:`Something wrong ${error.message}`}
  }else{
    if(data){
      console.log(data);
      return {error:false,pesan:'Send message success',data:data}
    }
  }
}

// APPROVE JOIN GROUP 
export async function approveJoinGroup(id,value){
  const { data, error } = await supabase
  .from('join-group')
  .update({approve:value})
  .eq('user_id',id)
  .select()
   if(error){
console.log(error.message);
return {error:true,pesan:`Something wrong ${error.message}`}
  }else{
    if(data){
      console.log(data);
      const args = {
        sender_id:data[0].creator_id,
        receive_id:data[0].user_id,
        type:'msg'
      }
      if(value){
        const msg = `Congratulation you already join in group !`
        const message = await  sendMessage(args,msg)
        const join = await chatGroupMember(id,data[0].group_id)
        console.log(join);
      }else{
        const msg = `Unfortunately your join proposal had been rejected !`
        const message = await  sendMessage(args,msg)
        console.log(message);
      }
      return {error:false,pesan:'Approve success',data:data}
    }
  }
}




