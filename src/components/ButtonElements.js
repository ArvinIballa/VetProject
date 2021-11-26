import styled from "styled-components";
import {Link} from 'react-scroll'

export const Button = styled(Link)`
    border-radius: 50px;
    background: ${({primary}) => (primary ? '#00b8d4' : '#1569C7')};
    white-space: nowrap;
    padding: ${({big}) => (big ? '14px 48px' : '12px 30px')};
    color: ${({dark}) => (dark ? '#010606' : 'white')};
    font-size: ${({fontBig}) => (fontBig ? '20px' : '16px')};
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        padding: 20px 25px;
        transition: all 0.3s ease-in-out;
        color: #00b8d4;
        background: ${({primary}) => (primary ? '#D1D4D5' : '#fff')};  
    }
`