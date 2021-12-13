import React, { useState } from 'react'
import { Button } from '../ButtonElements'

import { 
    Column2, 
    ImgWrap, 
    InfoContainer, 
    InfoWrapper, 
    InfoRow, 
    Column1, 
    Img,
    TopLine, 
    TextWrapper,
    Heading, 
    Subtitle, 
    BtnWrap, 
} from './InfoElements'

import {
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Input
} from 'reactstrap'
import { TextField, CircularProgress } from '@mui/material'
import api from '../../api/api'
import { margin } from '@mui/system'


const InfoSection = ({onclick, lightBg, id, imgStart, topLine, lightText, darkText, headLine, description, buttonLabel, img, alt, primary, dark, dark2}) => {
    
    const [modal, setModal] = useState(false)
    const [errorModal, setErrorModal] = useState(false)
    const [successModal, setSuccessModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const toggleErrorModal = () => {
        setErrorModal(!errorModal)
        
    }

    const toggleSuccessModal = () => {
        setSuccessModal(!successModal)
        
    }

    const toggleRegisterModal = (onclick) => {
        setModal(!onclick)
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setPhonenumber("")
        setRegisterAs("")
        setInvalidEmail("")
        setInvalidSelect(false)
        
    }

    const resetState = () => {
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setPhonenumber("")
        setRegisterAs("")
        setInvalidSelect(false)
    }

    const handleOk = () => {
        setSuccessModal(false)
        setModal(false)
    }


    const [registerAs, setRegisterAs] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm_password, setConfirmPassword] = useState("")
    const [invalidSelect, setInvalidSelect] = useState(false)
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [validEmail, setValidEmail] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const emailRegex = /\S+@\S+\.\S+/;

    const validateEmail = (event) => {
        const emailValidation = event.target.value;
        if (emailRegex.test(emailValidation)) {
            setEmail(emailValidation)
            setInvalidEmail('')
            setValidEmail(true)
        } 
        else {
            setInvalidEmail('Please enter a valid email!');
            setValidEmail(false)
        }
    };

    const handleRegister = () => {
        setIsLoading(false)
        const RegisterPayload = {
            first_name,
            last_name,
            phonenumber,
            email,
            password
        }
        console.log(RegisterPayload, registerAs)
        if(registerAs == ""){
            setInvalidSelect(true)
            setErrorModal(true)
            setErrorMessage('All fields are required.')
            setIsLoading(true)
            return false
        }
        else if(first_name == "" || last_name == "" || email == "" || phonenumber == "" || password == ""){
            setErrorModal(true)
            setErrorMessage('All fields are required.')
            setIsLoading(true)
            return false
        }
        else if(validEmail == false){
            setErrorModal(true)
            setErrorMessage('Please check your email address')
            setIsLoading(true)
            return false
        }
        else if(password != confirm_password){
            setErrorModal(true)
            setErrorMessage('Password did not match')
            setIsLoading(true)
            return false
        }

        else if(registerAs == 1){
            api.post('Owners', RegisterPayload)
            .then(res => {
                console.log(res)
                if(res.message == 'Email already exists.')
                {
                    setErrorMessage(res.message)
                    setErrorModal(true)
                    setIsLoading(true)
                    return false
                }
                else{
                    setSuccessMessage(res.message)
                    setSuccessModal(true)
                    setModal(false)
                    setIsLoading(true)
                    resetState()
                }
            })
            .catch(err => {
                console.log(err.response)
            })
        }

        else if(registerAs == 2){
            api.post('Vets', RegisterPayload)
            .then(res => {
                console.log(res)
                if(res.message == 'Email already exists.')
                {
                    setErrorMessage(res.message)
                    setErrorModal(true)
                    setIsLoading(true)
                    return false
                }
                else{
                    setSuccessMessage(res.message)
                    setSuccessModal(true)
                    setModal(false)
                    setIsLoading(true)
                    resetState()
                }
            })
            .catch(err => {
                console.log(err.response)
            })
        }
    }

    return (
        <>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
        {/** SUCCESS MODAL */}
            <Modal centered backdrop="static" size="md" isOpen={successModal}>
                <ModalHeader>
                    Success!
                </ModalHeader>
                <ModalBody>
                    {successMessage}
                </ModalBody>
                <ModalFooter>
                <button className="btnAdd" onClick={handleOk}>OK</button>
                </ModalFooter>
            </Modal>
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
            <Modal centered backdrop="static" size="md" isOpen={modal}>
                <ModalHeader>
                    Registration Form
                </ModalHeader>
                <ModalBody>
                    <Input
                        type="select"
                        required
                        onChange={e=> setRegisterAs(e.target.value)}
                        invalid={invalidSelect}
                    >
                    <option disabled selected value="">Register as</option>
                    <option value={1}>Owner</option>
                    <option value={2}>Veterinarian Doctor</option>
                    </Input>
                    <br/>
                    <TextField
                        label='First Name'
                        variant='outlined'
                        style={{ width: "100%", justifyContent: "center", display: "flex", margin: "auto" }}
                        onChange={e=> setFirstName(e.target.value)}
                    />
                    <br/>
                    <TextField
                        label='Last Name'
                        variant='outlined'
                        style={{ width: "100%", justifyContent: "center", display: "flex", margin: "auto" }}
                        onChange={e=> setLastName(e.target.value)}
                    />
                    <br/>
                    <TextField
                        label='Email Address'
                        helperText='We encourage you to use your Gmail account'
                        type='email'
                        variant='outlined'
                        style={{ width: "100%", justifyContent: "center", display: "flex", margin: "auto" }}
                        onChange={validateEmail}
                    />
                    <label style={{color: 'red', marginBottom: '10px'}}>{invalidEmail}</label> 
                    <br/>      
                    <TextField
                        label='Contact Number'
                        variant='outlined'
                        style={{ width: "100%", justifyContent: "center", display: "flex", margin: "auto" }}
                        onChange={e=> setPhonenumber(e.target.value)}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        onPaste={(e)=>{
                            e.preventDefault()
                            return false;
                        }} 
                        onCopy={(e)=>{
                            e.preventDefault()
                            return false;
                        }}
                    />
                    <br/>
                    <TextField
                        label='Password'
                        variant='outlined'
                        type='password'
                        style={{ width: "100%", justifyContent: "center", display: "flex", margin: "auto" }}
                        onChange={e=> setPassword(e.target.value)}
                    />
                    <br/>
                    <TextField
                        label='Confirm Password'
                        type='password'
                        variant='outlined'
                        style={{ width: "100%", justifyContent: "center", display: "flex", margin: "auto" }}
                        onChange={e=> setConfirmPassword(e.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <button hidden={!isLoading} className="btnCancel" onClick={toggleRegisterModal}>Close</button>
                    <button hidden={!isLoading} className="btnView" onClick={handleRegister}>Register</button>
                    <CircularProgress hidden={isLoading}/>
                </ModalFooter>
            </Modal>
            <InfoContainer lightBg={lightBg} id={id}>
                <InfoWrapper>
                    <InfoRow imgStart={imgStart}>
                        <Column1>
                            <TextWrapper>
                                <TopLine>{topLine}</TopLine>
                                <Heading lightText={lightText}>{headLine}</Heading>
                                <Subtitle darkText={darkText}>{description}</Subtitle>
                                <BtnWrap>
                                    <Button 
                                        to='register'
                                        duration={500}
                                        spy={true}
                                        smooth={true}
                                        exact='true'
                                        offset={-80}
                                        primary={primary ? 1 : 0}
                                        dark={dark ? 1 : 0}
                                        dark2={dark2 ? 1 : 0}
                                        onClick={()=> toggleRegisterModal(onclick)}
                                    >
                                        {buttonLabel}
                                    </Button>
                                </BtnWrap>
                            </TextWrapper>
                        </Column1>
                        <Column2>
                            <ImgWrap>
                                <Img src={img}/>
                            </ImgWrap>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>
            </InfoContainer>
        </>
    )
}

export default InfoSection
