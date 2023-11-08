import './style.css'; 
import Header from './components/Header';
import AuthScreen from './components/AuthScreen';
import AuthScreenContext from './components/AuthScreenContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UserContext from './components/UserContext';
import PostsListing from './components/PostsListing';
import Community from './components/Community';
import CommentPage from './components/CommentPage';
import Routing from './components/Routing';
import PostFormPopup from './components/PostFormPopup';
import PostPopupContext from './components/PostPopupContext';

function App() {

  const [showPostPopup, setShowPostPopup] = useState(false);
  const [showAuthScreen, setShowAuthScreen] = useState(false);
  const [user, setUser] = useState({});


  useEffect(()=>{
    axios.get('http://localhost:4000/user', {withCredentials:true})
    .then((response)=>{
      setUser(response.data)
    })
    .catch((err)=>console.log());
  },[])

  function logout(){
    axios.post('http://localhost:4000/logout',{},{withCredentials:true})
    .then(()=>setUser({}));
  }

  return (
    <div className='bgLightGray h-100 text-light'>

      <AuthScreenContext.Provider value={{show:showAuthScreen, setShow: setShowAuthScreen}}>
      <UserContext.Provider value={{...user,logout, setUser}}>
      <PostPopupContext.Provider value={{show:showPostPopup, setShow:setShowPostPopup}}>
        <Routing/>
      </PostPopupContext.Provider>
      </UserContext.Provider>
      </AuthScreenContext.Provider>
    </div>
  );
}

export default App;
