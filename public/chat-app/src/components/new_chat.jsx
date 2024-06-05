import React, {useEffect} from 'react'

import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { BiPlus } from "react-icons/bi";

export default function NewChat({user_id, handleClick}) {
    return (
        <Button onClick={(event)=>handleClick(event)}>
            <BiPlus/>
        </Button>
    )
}
const Button = styled.button`
    display:flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #9a86f3;
    border: none;
    cursor: pointer;
    svg{
        font-size: 1.3rem;
        color: #3ebe7ff;
    }
`;