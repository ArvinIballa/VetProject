import styled from "styled-components";
import {Link} from 'react-router-dom'

export const Container = styled.div`
    min-height: 692px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 0;
    overflow: hidden;
    background: 
        linear-gradient(90deg, rgba(0,212,255,1) 0%, rgba(21,101,192,1) 100%)
`

export const FormWrap = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width : 480px){
        height: 80px;
    }
`

export const Icon = styled(Link)`
    margin-left: 32px;
    margin-top: 32px;
    text-decoration: none;
    color: #fff;
    font-weight: 700;
    font-size: 32px;

    @media screen and (max-width: 480px) {
        margin-left: 16px;
        margin-top: 40px;
    }
`

export const FormContent = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 480px) {
        padding: 10px;
    }
`

export const Form = styled.form`
    background: #00b8d4;
    max-width: 500px;
    height: auto;
    z-index: 1;
    display: grid;
    margin: 0 auto 50px;
    padding: 35px 50px 30px;
    border-radius: 50px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
    transition: all 0.2s ease-in-out;
    
    @media screen and (max-width: 780px) {
        padding: 35px 50px 30px;
        width: 70%;
        transition: all 0.2s ease-in-out;
    }
    @media screen and (max-width: 480px) {
        margin-top: 600px;
        padding: 15px 25px 15px 25px;
        width: 90%;
        transition: all 0.2s ease-in-out;
    }
    @media screen and (max-width: 380px) {
        margin-top: 570px;
        padding: 25px 25px 25px 25px;
        width: 95%;
        transition: all 0.2s ease-in-out;
    }
`
export const FormRow = styled.div`
    display: flex;
    flex-direction: column;
`

export const Img = styled.img`
    border-radius: 50px;
    width: 70%;
    align-self: center;
    margin: 0 0 10px 0;
    padding-right: 0;
    transition: all 0.2s ease-in-out;

    &:hover{
        width: 80%;
        transition: all 0.2s ease-in-out;
    }
`

export const FormH1 = styled.h1`
    margin-bottom: 40px;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    letter-spacing: 1.5px;
`
export const FormLabel = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    color: #fff;
`

export const FormInput = styled.input`
    padding: 16px 16px;
    margin-bottom: 32px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
`

export const FormButton = styled.button`
    background: #1565c0;
    padding: 16px 0;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover{
        background: #2676d1;
        border-radius: 50px;
        font-weight: bold;
        transition: all 0.2s ease-in-out;
        
    }
`

export const Text = styled.span`
    text-align: center;
    margin-top: 30px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        color: #1565c0;
    }
`