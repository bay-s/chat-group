import supabase from "../supabase-config";


// GET USER BY USERNAME
export async function getUserByName(name){
  const { data, error } = await supabase
  .from('users')
  .select()
  .eq('username',name)
   if(error){
    return {error:true,pesan:`Something wrong ${error.message}`}
  }else{
    if(data){
      console.log(data);
      return {error:false,pesan:'get producthistory success',data:data}
    }
  }
}


// GET USER BY ID
export async function getUserById(id){
  const { data, error } = await supabase
  .from('users')
  .select()
  .eq('user_id',id)
   if(error){
    return {error:true,pesan:`Something wrong ${error.message}`}
  }else{
    if(data){
      console.log(data);
      return {error:false,pesan:'get producthistory success',data:data}
    }
  }
}


// GET CHAT
export async function getMembers(){
  const { data, error } = await supabase
  .from('chat-group-member')
  .select()
   if(error){
    return {error:true,pesan:`Something wrong ${error.message}`}
  }else{
    if(data){
      console.log(data);
      return {error:false,pesan:'get producthistory success',data:data}
    }
  }
}

export async function getAllChat(id){
  const { data, error } = await supabase
  .from('chat-group')
  .select()
  .eq('group_id',id)
   if(error){
    return {error:true,pesan:`Something wrong ${error.message}`}
  }else{
    if(data){
      console.log(data);
      return {error:false,pesan:'get producthistory success',data:data}
    }
  }
}

// get server
export async function getAllServer(){
  const { data, error } = await supabase
  .from('chat-server')
  .select()
   if(error){
    return {error:true,pesan:`Something wrong ${error.message}`}
  }else{
    if(data){
      console.log(data);
      return {error:false,pesan:'get producthistory success',data:data}
    }
  }
}

// GET USER CHANNEL
export async function getUserServer(id){
  const { data, error } = await supabase
  .from('chat-server')
  .select()
  .eq('creator_id',id)
   if(error){
    return {error:true,pesan:`Something wrong ${error.message}`}
  }else{
    if(data){
      console.log(data);
      return {error:false,pesan:'get producthistory success',data:data}
    }
  }
}

// GET SERVER DETAIL
export async function getServerDetail(id){
  const { data, error } = await supabase
  .from('chat-server')
  .select()
  .eq('id',id)
   if(error){
    return {error:true,pesan:`Something wrong ${error.message}`}
  }else{
    if(data){
      console.log(data);
      return {error:false,pesan:'get producthistory success',data:data}
    }
  }
}
