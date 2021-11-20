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
        margin-top: 8px;
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
    max-width: 600px;
    height: auto;
    width: 90%;
    z-index: 1;
    display: grid;
    margin: 0 auto;
    padding: 110px 50px;
    border-radius: 50px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);

    @media screen and (max-width: 480px) {
        padding: 10px 10px;
        width: 80%;
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
    font-family: 'Century Gothic';
    letter-spacing: 1.5px;
`
export const FormLabel = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    color: #fff;
    font-family: 'Century Gothic';
`

export const FormInput = styled.input`
    padding: 16px 16px;
    margin-bottom: 32px;
    border: none;
    border-radius: 4px;
    font-family: 'Century Gothic';
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
    font-family: 'Century Gothic';

    &:hover{
        background: #2676d1;
        border-radius: 50px;
        transition: all 0.2s ease-in-out;
    }
`

export const Text = styled.span`
    text-align: center;
    margin-top: 24px;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    font-family: 'Century Gothic';

    &:hover {
        color: #1565c0;
    }
`