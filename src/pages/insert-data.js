import supabase from "../supabase-config";

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

// GET URL
export async function getPublicUrl(id,url){
  const { data } = supabase
  .storage.from('images')
  .getPublicUrl(url)
  if(data){
    const imgUrl = data.publicUrl;
    console.log(imgUrl);
    console.log(id);
    console.log(url);
    const updateBanner = await UpdateBanner(id,imgUrl)
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

//  REMOVE IMAGES

 export async function removeImages(images){
  const { data, error } = await supabase.storage.from('images')
    .remove([`public/${images.imgName}`])
    if(error) alert(error)
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