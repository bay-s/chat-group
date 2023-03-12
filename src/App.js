import { BrowserRouter, Routes, Route, useHref, useNavigate } from "react-router-dom"
import { createContext, useEffect, useRef, useState } from "react"
import supabase from "./supabase-config"
import Header from "./pages/header"
import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
import Detail from "./pages/detail"
import DirectMessage from "./pages/direct-message"
import NotFound from "./pages/404.j"
import Profiles from "./pages/profiles"
import DetailPageWelcome from "./pages/detail-page-welcome"
import DetailPageGeneral from "./pages/detail-page-general"
import EditChannel from "./pages/edit-channel"

export const AppContext = createContext()

const App = () => {
  const [users,setUsers] = useState([]);
  const [isLogin,setIsLogin] = useState(false)
  const [data,setData] = useState([])
  const [metadata,setMetadata] = useState([])
  useEffect(() => {

    const user = getUsers()
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == 'SIGNED_IN') {
        // console.log('SIGNED_IN', session)
        const { data, error } = supabase.auth.setSession(session.refresh_token)
        // setIsLogin(true)
        setUsers(user)
        console.log("log int");
        // console.log(session.refresh_token);
      }
      if (event == 'TOKEN_REFRESHED') {
        // console.log('TOKEN_REFRESHED', session)
        const { data, error } = supabase.auth.setSession(session.refresh_token)
        // console.log(session.refresh_token);
      }
      if (event == 'SIGNED_OUT') {
        setIsLogin(false) 
        window.location.href = "/";
        console.log("logout");
      }
    })

  },[])


  const getUsers = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if(user){
      console.log("user logged in");
      console.log(user);
      setUsers(user)
      setMetadata(user.user_metadata)
      setIsLogin(true)
    }else{
      console.log("not login");
      setIsLogin(false)
    }
    const check =  user ? fetchData(user.id) :  setIsLogin(false)
  }

  const fetchData = async (id) => {
    const {data,error} = await supabase
    .from('users')
    .select()
    .eq('user_id',id)
    .single()
    if(error){
      console.log(error);
    }
    if(data){
      setData(data)
      const check = data !== null ? setIsLogin(true)  : setIsLogin(false) 
    }
  }

  const value = {
   data,
   isLogin,
   user:metadata
  }
  return (
<AppContext.Provider value={{value}}>
<BrowserRouter>
{/* <Header /> */}
    <Routes>
    <Route path='/' element={isLogin ? <Home  /> : <Login />} /> 
    <Route path='/profiles/:id' element={isLogin ? <Profiles  /> : <Login />} /> 
    <Route path='/channel/:id' element={isLogin ? <Detail  />  : <Login />} /> 
    <Route path='/channel/:id/welcome' element={isLogin ? <DetailPageWelcome /> : <Login />} />
    <Route path='/channel/:id/general' element={isLogin ? <DetailPageGeneral /> : <Login />} />
    <Route path='/channel/edit/:id' element={isLogin ? <EditChannel /> : <Login />} />
    <Route path='/message/:id' element={isLogin ? <DirectMessage /> : <Login />} />
    <Route path='/register/' element={ <Register /> } /> 
    <Route path='/login/' element={ <Login /> } /> 
    <Route path='*' element={<NotFound />} />
    </Routes>
</BrowserRouter>
{/* <Footer /> */}
</AppContext.Provider>

  );
}

export default App;


