import React,{useState} from 'react';
import styled from 'styled-components';
import Picker from "emoji-picker-react";
import {IoMdSend} from "react-icons/io";
import {BsEmojiSmileFill} from "react-icons/bs";
export default function ChatInputs({handleSendMsg}) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");
    const handleShowEmojiPickerHideShow = () =>{
        setShowEmojiPicker(!showEmojiPicker);
    };
    const handleEmojiClick=(event, emoji)=>{
        let message =msg;
        message+=emoji.emoji;
        //console.log(emoji.emoji);
        setMsg(message);
    }
    const sendChat=(event)=>{
        event.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg("");
        }
    }
    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleShowEmojiPickerHideShow}/>
                    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>}
                </div>
            </div>
            <form className="input-container" onSubmit={(e)=>sendChat(e)}>
                <input type="text" placeholder="type your message here" value={msg} onChange={(e)=>setMsg(e.target.value)}/>
                <button className='submit'>
                    <IoMdSend/>
                </button>
            </form>
            
        </Container>
    );
}
const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: bottom;
    background-color: #080420;
    padding: 0 2rem;
    padding-top: 1rem;
    padding-bottom: 1.3rem;
    .button-container{
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        .emoji{
            position: relative;
            svg{
                font-size: 2.5rem;
                color:#ffff00c8;
                cursor:pointer;
            }
            Picker {
                position: absolute;
                top:-350px;
                background-color: #080420;
                box-shadow: 0 5px 10px;
                border-color: #9186f3;
                .emogi-scroll-wrapper::-webkit-scroll{
                    bacground-color: #080420;
                    width: 5px;
                    &-thumb{
                        background-color: #9186f3;
                    }
                }
                .emoji-categories{
                    button{
                        filter: contract(0);
                    }
                }
                .emoji-search{
                    background-color: #9186f3;
                }
                .emoji-group:before{
                    background-color: #080420;
                }
            }
            
        }
    }
    .input-container{
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-content: center;
        gap: 2rem;
        background-color: #ffffff34;
        input{
            width: 100%;
            height: 100%;
            background-color: transparent;
            color: white;
            border: none;
            padding-left: 1rem;
            font-size: 1.2rem;
            &::selection{
                background-color: #9186f3;
            }
            &:focus{
                outline: none;
            }
        }
        button{
            padding:0.3rem 2rem;
            border-radius: 2rem;
            display:flex;
            justify-content: center;
            align-items: center;
            background-color: #9a86f3;
            border: none;
            svg{
                font-size:2rem;
                color:white;
            }
        }
    }
`;