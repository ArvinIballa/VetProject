import React, { useState } from 'react'
import ClientIcon from '../../images/client.png'
import {Link, Navigate} from "react-router-dom";
import api from '../../api/api'
import { 
    Container, 
    FormWrap, 
    Icon, 
    FormContent, 
    Form, 
    FormH1, 
    FormLabel, 
    FormInput, 
    FormButton, 
    Text,
    FormRow,
    Img
} from './SigninElements'

import {
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Input
} from 'reactstrap'

import {CircularProgress} from '@mui/material'


const Signin = () => {

    const [redirect, setRedirect]= useState(0)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [errorModal, setErrorModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const toggleErrorModal = () => {
        setErrorModal(!errorModal)
    }

    const resetState = () => {
        setEmail("")
        setPassword("")
    }

    const handleLogin = () => {
        setIsLoading(false)
        const loginPayload = {
            email,
            password
        }
        api.post('Owners/login', loginPayload)
        .then(res => {
            console.log(res)
            if(res.token){
                sessionStorage.setItem('token', res.token)
                setRedirect(1)
                setIsLoading(true)
                resetState()
            }
            else{
                setErrorModal(true)
                setIsLoading(true)
                setErrorMessage(res.message)
                return false
            }
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    if(redirect == 1){
        return <Navigate to= "/Client/Profile"/>
    }

    return (
        <>
         {/** ERROR MODAL */}
            <Modal centered backdrop="static" size="md" isOpen={errorModal}>
                <ModalHeader>
                    Notice!
                </ModalHeader>
                <ModalBody>
                    {errorMessage}
                </ModalBody>
                <ModalFooter>
                <button className="btnCancel" onClick={toggleErrorModal}>OK</button>
                </ModalFooter>
            </Modal>
            <Container>
                <FormWrap>
                    <Icon to="/">Petra</Icon>
                    <FormContent>
                        <Form>
                            <FormRow>
                                <FormH1>Sign in to your account</FormH1>
                                <Img src={ClientIcon}></Img>
                                <FormLabel htmlFor='for'>Email</FormLabel>
                                <FormInput 
                                    onChange={e=> setEmail(e.target.value)} 
                                    type='email' 
                                    required>                      
                                </FormInput>
                                <FormLabel htmlFor='for'>Password</FormLabel>
                                <FormInput 
                                    type='password' 
                                    onChange={e=> setPassword(e.target.value)}
                                    required>
                                </FormInput>
                                <div hidden={isLoading} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                <CircularProgress />
                                </div>
                                <FormButton hidden={!isLoading} type='submit' onClick={handleLogin}>Log In</FormButton>
                                <Text>Forgot Password?</Text>
                            </FormRow>
                        </Form>
                        
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
}

export default Signin
