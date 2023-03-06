import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../supabase-config'
import ErrorMessage from './error-message';
import { insertUserData, RegisterAccount } from './insert-data';

const Register = () => {

const [message, setMessage] = useState({
    pesan: "",
    isError: false,
    sukses: false,
    isSubmit: false,
 });
  
const [values,setValues] = useState({
  username:"",
  email:"",
  fullname:'',
  password:""
})

 const  handlerChange = async (e) => {
    const {name,value} = e.target
    setValues({
      ...values,
      [name]:value
    });
  console.log(values);
  }

const RegisterUser = async (e) => {
  setMessage({ ...message, isSubmit: true });
  e.preventDefault();
  console.log(values);
    if(!values.email || !values.password || !values.username  || !values.fullname){
      const pesan = `Input are Required`
      console.log(message);
      errMessage(pesan)
      return;
    }if(/\s/.test(values.username)){
      const pesan = `Username can't contain white space `
      errMessage(pesan)
      return;
    }
    const register = await RegisterAccount(values)
      if(register.error){
        console.log(register.error);
        errMessage(register.pesan)
      }else{
        successMessage(register)
        console.log(register.data.user.id);
        const insert = await insertData(register.data.user.id,values)
      }

  }
  
  // ERR MESSAGE
  const errMessage = (msg) =>{
    setMessage({ ...message, 
      pesan:msg,
      isError: true,
      sukses: false,
      isSubmit:false
    });
  }

// SUCCESS MESSAGE
  const successMessage = (args) =>{
    setMessage({ ...message, 
      pesan:args.pesan,
      isError:args.error,
      sukses: true,
      isSubmit:false
    });   
  }

  const insertData = async (id,values) => {
      const data = await insertUserData(id,values)
      console.log(data);
      if(data.error){
        errMessage(data.pesan)
      }else  successMessage(data)
  }


    return(
<section id='users'>
  
<div className='container forms' id='container'>

<div class="columns is-centered ">
            <div class="column is-5 box p-0 has-background-grey-dark shadow txt-white">

            <div class="is-flex justify-center p-5">
             <Link to='/' className='main-title has-text-info is-size-2'>
              Chat App
             </Link>
            </div>
            <hr class="border-butt" />

            <form action="" class="p-5 is-flex flex-column gap-2" onSubmit={RegisterUser}>
                <h3 class="is-bold is-size-4 is-title "> CREATE ACCOUNT</h3>

                <div class="field">
                    <label class="label txt-white">Username</label>
                    <div class="control">
                      <input class="input is-medium" name='username' type="text" onChange={handlerChange} />
                    </div>
                </div>
                  
                
                <div class="field">
                    <label class="label txt-white">Fullname</label>
                    <div class="control">
                      <input class="input is-medium " name='fullname' type="text" onChange={handlerChange}/>
                    </div>
                </div>

                    
                <div class="field">
                    <label class="label txt-white">Email</label>
                    <div class="control">
                      <input class="input is-medium " name='email' type="email" onChange={handlerChange}/>
                    </div>
                </div>

                <div class="field">
                    <label class="label txt-white">Password</label>
                    <div class="control">
                      <input class="input is-medium " name='password' type="password" onChange={handlerChange}/>
                    </div>
                </div>
                 
                {
                  message.isSubmit ? <a href='#' className='button is-info is-loading' disabled>Register</a>
                  : <button class="button is-info">
                 Register
                 </button>
                }
                    <ErrorMessage pesan={message.pesan} isError={message.isError} sukses={message.sukses}/>

                <ul class="is-flex flex-column gap-1 align-center my-3">
                   <li><span>
                   Already have an account?
                   </span></li>
                   <li><Link to="/login" class="button is-light no-border has-text-info">
                    Login
                   </Link></li>
                </ul>
            </form>
            <hr class="border-butt" />
            <div class="p-5 is-flex flex-column gap-1 align-center">
                <a href="" class="has-text-info">What's SportsEngine?</a>
                <p class="is-flex gap-1 align-center">
                    <span>Need Help? </span>
                    <a href="" class="has-text-info">SportsEngine Help Center </a> 
                </p>              
            </div>
            </div>
        </div>

</div>

</section>
    )
}

export default Register

