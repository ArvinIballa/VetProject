import React, { useState, useEffect } from 'react'
import { Container } from 'reactstrap'
import AdminNavbar from './Navbar'
import api from '../../api/api'

import {
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Input
} from 'reactstrap'
import { TextField, CircularProgress } from '@mui/material'

const AdminAccount = () => {

    const getToken = sessionStorage.getItem('token')

    const [errorModal, setErrorModal] = useState(false)
    const [successModal, setSuccessModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [deleteModal, setDeleteModal] = useState(false)


    const [adminData, setAdminData] = useState([])
    const [modalAddAdmin, setModalAddAdmin] = useState(false)
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm_password, setConfirmPassword] = useState("")
    const [validEmail, setValidEmail] = useState('')
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(0)
    const [passwordError, setPasswordError] = useState(0)
    const [admin_id, setAdminID] = useState('')
    const resetState = () => {
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setPhonenumber("")
    }

    const toggleDeleteModal = (admin_id) => {
        setAdminID(admin_id)
        setDeleteModal(!deleteModal)
    }

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

    const toggleAddAdmin = () => {
        setModalAddAdmin(!modalAddAdmin)
        setError(0)
        setPasswordError(0)
    }

    const toggleErrorModal = () => {
        setErrorModal(!errorModal)
        
    }

    const handleDelete = () => {
        setIsLoading(false)
        api.delete(`Admins/delete_admin/${admin_id}`, {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.message){
                setSuccessModal(true)
                setSuccessMessage(res.message)
                setIsLoading(true)
                setDeleteModal(false)
                setAdminID('')
                getAdmins()
            }
            else
                return null
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    const handleOk = () => {
        setSuccessModal(false)
        setModalAddAdmin(false)
        setDeleteModal(false)
    }

    const getAdmins = () => {
        api.get('Admins/list', {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.body){
                setAdminData(res.body)
            }
            else
                return null
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleAddAdmin = () => {
        setIsLoading(false)
        const RegisterPayload = {
            first_name,
            last_name,
            phonenumber,
            email,
            password
        }

        if(first_name == "" || last_name == "" || email == "" || phonenumber == "" || password == ""){
            setErrorModal(true)
            setErrorMessage('All fields are required.')
            setIsLoading(true)
            setError(1)
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
            setPasswordError(1)
            return false
        }

        api.post('Admins', RegisterPayload)
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
                    setModalAddAdmin(false)
                    setIsLoading(true)
                    getAdmins()
                    resetState()
                }
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    useEffect(() => {
        getAdmins()
    }, [])

    return (
        <>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
            <AdminNavbar/>
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
            {/** DELETE MODAL */}
            <Modal centered backdrop="static" size="md" isOpen={deleteModal}>
                <ModalHeader>
                    Notice!
                </ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this?
                </ModalBody>
                <ModalFooter>
                    <CircularProgress hidden={isLoading} />
                    <button hidden={!isLoading} className="btnView" onClick={handleOk}>Cancel</button>
                    <button hidden={!isLoading} className="btnCancel" onClick={handleDelete}>Delete</button>
                </ModalFooter>
            </Modal>
            {/** MODAL ADD PETS */}
            <Modal centered backdrop="static" size="md" isOpen={modalAddAdmin}>
                <ModalHeader>
                    <h2>Add Pet</h2>
                </ModalHeader>
                <ModalBody>
                <TextField
                        error={error == 1 && first_name == ""}
                        label='First Name'
                        variant='outlined'
                        style={{ width: "100%", justifyContent: "center", display: "flex", margin: "auto" }}
                        onChange={e=> setFirstName(e.target.value)}
                    />
                    <br/>
                    <TextField
                        error={error == 1 && last_name == ""}
                        label='Last Name'
                        variant='outlined'
                        style={{ width: "100%", justifyContent: "center", display: "flex", margin: "auto" }}
                        onChange={e=> setLastName(e.target.value)}
                    />
                    <br/>
                    <TextField
                        error={error == 1 && email == ""}
                        label='Email Address'
                        type='email'
                        variant='outlined'
                        style={{ width: "100%", justifyContent: "center", display: "flex", margin: "auto" }}
                        onChange={validateEmail}
                    />
                    <label style={{color: 'red', marginBottom: '10px'}}>{invalidEmail}</label> 
                    <br/>      
                    <TextField
                        error={error == 1 && phonenumber == ""}
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
                        error={error == 1 && password == ""}
                        label='Password'
                        variant='outlined'
                        type='password'
                        style={{ width: "100%", justifyContent: "center", display: "flex", margin: "auto" }}
                        onChange={e=> setPassword(e.target.value)}
                    />
                    <br/>
                    <TextField
                        error={passwordError == 1}
                        label='Confirm Password'
                        type='password'
                        variant='outlined'
                        style={{ width: "100%", justifyContent: "center", display: "flex", margin: "auto" }}
                        onChange={e=> setConfirmPassword(e.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <CircularProgress hidden={isLoading}/>
                    <button hidden={!isLoading} onClick={toggleAddAdmin} className='btnCancel'>CLOSE</button>
                    <button hidden={!isLoading} onClick={handleAddAdmin} className='btnAdd'>ADD</button>
                </ModalFooter>
            </Modal>
            <Container>
                <div className='h2-wrapper'>  
                        <h2>Admin Accounts 
                            <button className="btnAdd" onClick={toggleAddAdmin}>+ ADD</button>
                        </h2>
                </div>
                <div className="containerTable">             
                    <div className="tableWrapper">
                        <table>
                            <tr>
                                <th>Name</th>
                                <th>Email Address</th>
                                <th>Contact Number</th>
                                <th>Action</th>
                            </tr>
                            {adminData.map((item)=> {
                                return(
                                    <tr>
                                    <td>{item.FirstName + ' ' + item.LastName}</td>
                                    <td style={{textTransform:'none'}}>{item.EmailAddress}</td>
                                    <td>{item.ContactNumber}</td> 
                                    <td>
                                        <button onClick={()=> toggleDeleteModal(item.AdminID)} className='btnCancel'>Delete</button>
                                    </td>                   
                                </tr>
                                )
                            })}
                        </table>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default AdminAccount
