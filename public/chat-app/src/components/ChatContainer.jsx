import React, {useState, useEffect, useRef} from 'react'
import styled from "styled-components";
import {sendMessageRoute, getAllMessagesRoute} from "../assets/utils/APIRoutes";
import axios from 'axios';
import ChatInputs from "./ChatInputs";
import {v4} from "uuid";

export default function ChatContainer({currentChat,currentUser,socket}) {  
    let result="";

    const stateUpdatePromiseRef = useRef(null);

    const runPythonScript = async () => {
        try {
            const response = await fetch('http://localhost:3001/run-python');
            const data = await response.text();
            result=data;
            console.log(data)
        } catch (error) {
            result=('Error fetching the Python script');
        }
    };
  

    const [messages, setMessages] = useState([]);
    const [arrivalMessage,setArrivalMessage]=useState(null);
    const scrollRef=useRef();
    useEffect(()=>{
        console.log(sendMessageRoute);
        console.log(currentChat);
        const dosomething3 = async()=>{
            const response = await axios.post(getAllMessagesRoute,{
                from: currentUser._id,
                to: currentChat._id,
            });
            setMessages(response.data);
        }
        if(currentUser !== undefined){
            dosomething3();
        }
    },[currentChat]);

    const handleSendMsg = async (msg) => {
        runPythonScript().then(response => {
        console.log(result);

        axios.post(sendMessageRoute,{
            from:currentUser._id,
            to: currentChat._id,
            message: msg,
        });
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: currentUser._id,
            message: msg,
        });
        const msgs = [...messages];
        msgs.push({fromSelf: true, message: msg});
        axios.post(sendMessageRoute,{
            from:currentChat._id,
            to: currentUser._id,
            message: result,
        });
        socket.current.emit("send-msg", {
            to: currentUser._id,
            from: currentChat._id,
            message: result,
        });
        msgs.push({fromSelf: false, message: result});
        setMessages(msgs);
    });
    };
    useEffect(()=>{
        if(socket.current){
            console.log("here");
            socket.current.on("msg-receive",(msg)=>{
                setArrivalMessage({fromSelf:false,message:msg});
            });
        }
    },[]);
    useEffect(()=>{
        arrivalMessage && setMessages((prev)=>[...prev, arrivalMessage]);
    },[arrivalMessage]);
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"});
    },[messages]);
  return (
    <>
        {currentChat && (
            <Container>
                <div className="chat-header">
                    <div className="user-details">
                        <div className="avatar">
                            <img 
                            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                            alt="avatar"  
                            />
                        </div>
                        <div className="username">
                            <h3>{currentChat.username}</h3>
                        </div>
                    </div>
                </div>
                <div className="chat-messages">
                    {
                        messages.map((message)=>{
                            return(
                                <div ref={scrollRef} key={v4()}>
                                    <div className={`message ${message.fromSelf ? "sent":"received"}`}>
                                        <div className="content">
                                            <p>
                                                {message.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                {/* <div className="chat-messages">hjdfkdj</div> */}
                <ChatInputs handleSendMsg ={handleSendMsg}/>
            </Container>
        )}
    </>
  )
}
const Container = styled.div`
    padding-top: 1rem;
    display: grid;
    grid-template-rows: 10% 78% 12%;
    gap: 0.1rem;
    overflow: hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px){
        grid-auto-rows: 15% 70% 15%;
    }
    .chat-header{
        display:flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
        .user-details{
            display:flex;
            align-items: center;
            gap: 1rem;
            .avatar{
                img{
                    height: 3rem;
                }
            }
            .username{
                h3{
                    color:white;
                }
            }
        }
    }
    .chat-messages{
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        .message{
            display:flex;
            align-items:center;
            .content{
                max-width: 40%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color: #d1d1d1;
            }
        }
        .sent{
            justify-content: flex-end;
            .content{
                background-color: #4f04ff21;
            }
        }
        .received{
            justify-content: flex-start;
            .content{
                background-color: #9900ff20;
            }
        }
    }
`;