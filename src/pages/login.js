import React, { useState } from 'react'
import { Link , Navigate} from 'react-router-dom'
import supabase from '../supabase-config'
import ErrorMessage from './error-message';
import { UserLogin } from './insert-data';

const Login = ({isLogin}) => {
  
  const [message, setMessage] = useState({
    pesan: "",
    isError: false,
    sukses: false,
    isSubmit: false,
 });

  const [values,setValues] = useState({
    email:"",
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
  
  
const userLogin = async (e) => {
      setMessage({ ...message, isSubmit: true });
      e.preventDefault();
    
        if(!values.email || !values.password){
          const pesan = `Input are Required`
          errMessage(pesan)
          console.log(message);
          return;
        }
        const login =  await UserLogin(values)
        if(login.error){
          errMessage(login.pesan)
        }else{
          successMessage(login)
          window.location = "/";
        }
    }
    
  // ERR MESSAGE
  const errMessage = (msg) =>{
    setMessage({ ...message, 
      pesan:msg,
      isError: true,
      sukses: false,
    });
  }
// SUCCESS MESSAGE
  const successMessage = (args) =>{
    setMessage({ ...message, 
      pesan:args.pesan,
      isError:args.error,
      sukses: true,
    });   
  }

  
  const signInWithGoogle = async (e) => {
      e.preventDefault()
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      })
      if(error) console.log(error);
      else console.log(data);
    }

    const signInWithGitHub = async (e) => {
      e.preventDefault()
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
      })
      if(error) console.log(error);
      else console.log(data);
    }
    

    return(
      <section id='users'>
        {
isLogin ? <Navigate to="/" replace={true} /> :

      <div class="container forms" id='container'>
      <div class="columns is-centered my-5">
          <div class="column is-5 box p-0 has-background-grey-darker shadow txt-white">

          <div class="is-flex justify-center p-5">
              <Link to='/' className='main-title  has-text-info is-size-2'>Chat App</Link>
          </div>
          <hr class="border-butt" />

          <form action="" class="p-5 is-flex flex-column gap-2" onSubmit={userLogin}>
              <h3 class="txt-bold is-size-4 is-title is-bold">Sign In</h3>

              <div class="field">
                  <p class="control has-icons-left has-icons-right">
                    <input class="input is-medium" name='email' type="email" placeholder="Email" onChange={ handlerChange}/>
                    <span class="icon is-small is-left">
                      <i class="fa fa-envelope txt-white"></i>
                    </span>
                    <span class="icon is-small is-right">
                      <i class="fa fa-check txt-white"></i>
                    </span>
                  </p>
                </div>
                <div class="field">
                  <p class="control has-icons-left">
                    <input class="input is-medium " name='password' type="password" placeholder="Password" onChange={ handlerChange}/>
                    <span class="icon is-small is-left">
                      <i class="fa fa-lock txt-white"></i>
                    </span>
                  </p>
                </div>
              
             {
              message.isSubmit ? <a href='#' className='button is-info is-loading' disabled>Login</a>
              : <button type='submit' class="button is-info">
                      Login
               </button>
             } 
               
             
<button className='button  w-100 is-flex gap-2' onClick={signInWithGoogle }>
<i class="fa fa-google" aria-hidden="true"></i>
<span className='is-title'>Login with Google</span>
</button>

<button className='button  w-100 is-flex gap-2' onClick={signInWithGitHub}>
<i class="fa fa-github" aria-hidden="true"></i>
<span className='is-title'>Login with Github</span>
</button>
<ErrorMessage pesan={message.pesan} isError={message.isError} sukses={message.sukses}/>

                  <ul class="is-flex flex-column gap-1 align-center my-3">
                 <li><span>
                  Don't have an account?
                 </span></li>
                 <li><Link to="/register" class="button is-light no-border has-text-info">
                  CREATE ACCOUNT
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
        }
  </section>
    )
}

export default Login

