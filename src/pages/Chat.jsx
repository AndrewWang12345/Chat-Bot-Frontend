import React, {useState, useEffect,useRef} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute,host } from '../assets/utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from "socket.io-client";
export default function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded,setIsLoaded] = useState(false);
  
  useEffect(()=>{
    doSomething1();
  }, []);
  useEffect(()=>{
    const doSomething4 = async() =>{
      if(currentUser){
        socket.current = io(host);
        socket.current.emit("add-user", currentUser._id);
      }
    }
    doSomething4();
  }, [currentUser]);
  const doSomething1 = async() =>{
    if(!localStorage.getItem("chat-app-user")){
      navigate("/login");
    } else {
      //console.log(JSON.parse(localStorage.getItem('chat-app-user')));
      const temp = JSON.parse(localStorage.getItem('chat-app-user'));
      setCurrentUser(temp);
      //console.log(currentUser);
      setIsLoaded(true);
    }
  }
  
  useEffect(()=>{
    const doSomething2 = async() =>{
      console.log(currentUser);
      if(currentUser){
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      } else {
        navigate("/register");
      }
     }
    doSomething2();
  }, [currentUser])
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }
  return (
    <Container>
      <div className="container">
        <Contacts contacts = {contacts} currentUser = {currentUser} changeChat={handleChatChange}/>
        {isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser}/>
        ):(
          <ChatContainer 
          currentChat={currentChat} 
          currentUser={currentUser}
          socket={socket}/>
        )}
        
      </div>
    </Container>
  )
}
const Container = styled.div`
  height:100vh;
  width:100vw;
  display:flex;
  flex-direction:column;
  justify-content:center;
  gap:1rem;
  align-items:center;
  background-color:#131324;
  .container{
    height:85vh;
    width:85vw;
    background-color:#00000076;
    display:grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width:1080px){
      grid-template-columns: 35% 65%;
    }
  }
`;
