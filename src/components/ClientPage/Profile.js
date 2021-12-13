import React, { useState, useEffect } from 'react'
import docpic from '../../images/doctor2.jpg'
import VetNavbar from './Navbar'
import './profile.css'

import{
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody,
} from 'reactstrap'

import api from '../../api/api'

import { TextField, Skeleton, CircularProgress } from '@mui/material'
import { Navigate } from 'react-router-dom'


const Profile = () => {

    const getToken = sessionStorage.getItem('token')

    const [modalChangePass, setModalChangePass] = useState(false)
    const [modalChangeProfile, setModalChangeProfile] = useState(false)
    const [errorModal, setErrorModal] = useState(false)
    const [successModal, setSuccessModal] = useState(false)
    const [reloginModal, setReloginModal] = useState(false)
    const [reloginMessage, setReloginMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const toggleModalChangePass = () => {
        setModalChangePass(!modalChangePass)
    }

    
    const [isLoading, setIsLoading] = useState(true)
    const [confirmLoading, setConfirmLoading] = useState(true)
    const [profile_picture, setProfilePicture] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [phonenumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [oldEmail, setOldEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm_password, setConfirmPassword] = useState("")
    const [redirect, setRedirect] = useState(false)

    const toggleErrorModal = () => {
        setErrorModal(!errorModal)
    }

    const handleOk = () => {
        setSuccessModal(false)
        setModalChangeProfile(false)
        setModalChangePass(false)
    }


    const toggleModalChangeProfile = () => {
        setModalChangeProfile(!modalChangeProfile)
    }

    const loading = () => {
        setIsLoading(false)
        setTimeout( ()=>
            doneLoading(), 
            10000
        );
    }

    const resetState = () => {
        setProfilePicture("")
        setFirstName("")
        setLastName("")
        setPhoneNumber("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }

    const doneLoading = () => {
        getProfile()
        setIsLoading(true)
        sessionStorage.setItem('void-wlcm-loading', true)
    }

    const [profileData, setProfileData] = useState([])

    const getProfile = () => {
        setIsLoading(false)
        api.get('Owners/profile', {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.body){
                setProfileData(res.body[0])
                setEmail(res.body[0].EmailAddress)
                setPhoneNumber(res.body[0].ContactNumber)
                setFirstName(res.body[0].FirstName)
                setLastName(res.body[0].LastName)
                setIsLoading(true)
                setOldEmail(res.body[0].EmailAddress)
            }
            else{
                return null
            }
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    const handleRelogin = () => {
        sessionStorage.clear()
        setRedirect(true)
    }

    const handleUpdateProfile = () => {
        setConfirmLoading(false)
        let formdata = new FormData()
        formdata.append('first_name', first_name)
        formdata.append('last_name', last_name)
        formdata.append('phonenumber', phonenumber)
        formdata.append('email', email)
        formdata.append('profile_picture', profile_picture ? profile_picture : null)
        
        if(first_name == "" || last_name == "" || phonenumber == "" || email == ""){
            setErrorMessage('All fields are required.')
            setErrorModal(true)
            setConfirmLoading(true)
            return false
        }
        
        if(oldEmail != email){
            api.post('Owners/update', formdata, {headers: {Authorization: `Bearer ${getToken}`}})
            .then(res => {
                console.log(res, 'redirect')
                if(res.message){
                    setReloginModal(true)
                    setReloginMessage(res.message)
                    setConfirmLoading(true)
                }
                else
                    return null
            })
            .catch(err => {
                console.log(err.response)
            })
        }

        else {
            api.post('Owners/update', formdata, {headers: {Authorization: `Bearer ${getToken}`}})
            .then(res => {
                console.log(res)
                if(res.message){
                    setSuccessModal(true)
                    setSuccessMessage(res.message)
                    setConfirmLoading(true)
                    resetState()
                    getProfile()
                }
                else
                    return null
            })
            .catch(err => {
                console.log(err.response)
            })
        }
    }

    const handleChangePassword = () => {
        setConfirmLoading(false)
        const changePassPayload = {
            password
        }
        if(password != confirm_password){
            setErrorModal(true)
            setErrorMessage('Password does not match. Please try again!')
            setConfirmLoading(true)
            return false
        }
        api.post('Owners/update_password', changePassPayload, {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.message){
                setIsLoading(true)
                setReloginMessage(res.message + " Please relogin. Thank you!")
                setReloginModal(true)
                setConfirmLoading(true)
                resetState()
            }
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    useEffect(() => {
        if(!sessionStorage.getItem('void-wlcm-loading')){
            loading()
        }
        else{
            getProfile()
        }
    }, [])

    if(redirect == true){
        return <Navigate to = "/signinclient"/>
    }
    else if(getToken == null){
        return <Navigate to = "/"/>
    }

    return (
        <>
            <VetNavbar/>
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
            {/** RELOGIN MODAL */}
            <Modal centered backdrop="static" size="md" isOpen={reloginModal}>
                <ModalHeader>
                    Success!
                </ModalHeader>
                <ModalBody>
                    {reloginMessage}
                </ModalBody>
                <ModalFooter>
                <button className="btnAdd" onClick={handleRelogin}>OK</button>
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
            {/** MODAL CHANGE PASSWORD */}
            <Modal centered backdrop='static' size='md' isOpen={modalChangePass}>
                <ModalHeader>
                    Change Password
                </ModalHeader>
                <ModalBody>
                    <TextField
                        label='New Password'
                        type='password'
                        variant='outlined'
                        style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                        onChange={e=> setPassword(e.target.value)}
                    />
                    <br/>
                    <TextField
                        label='Confirm Password'
                        type='password'
                        variant='outlined'
                        style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                        onChange={e=> setConfirmPassword(e.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <CircularProgress hidden={confirmLoading} />
                    <button hidden={!confirmLoading} className="btnClose" onClick={toggleModalChangePass}>Cancel</button>
                    <button hidden={!confirmLoading} onClick={handleChangePassword} className="btnSave">Save</button>
                </ModalFooter>
            </Modal>
             {/** MODAL CHANGE PROFILE PICTURE */}
            <Modal centered backdrop='static' size='md' isOpen={modalChangeProfile}>
                <ModalHeader>
                    Edit Profile
                </ModalHeader>
                <ModalBody>
                    <TextField
                        label='First Name'
                        value={first_name}
                        variant='outlined'
                        style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                        onChange={e=> setFirstName(e.target.value)}
                    />
                    <br/>
                    <TextField
                        label='Last Name'
                        value={last_name}
                        variant='outlined'
                        style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                        onChange={e=> setLastName(e.target.value)}
                    />
                    <br/>
                    <TextField
                        label='Email'
                        value={email}
                        variant='outlined'
                        style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                        onChange={e=> setEmail(e.target.value)}
                    />
                    <br/>
                    <TextField
                        label='Phone Number'
                        value={phonenumber}
                        variant='outlined'
                        style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                        onChange={e=> setPhoneNumber(e.target.value)}
                    />
                    <label style={{marginLeft: '22px', marginTop: '10px'}}>Profile Picture</label>
                    <input 
                        style={{marginLeft: '22px'}} 
                        type='file'
                        onChange={e=> setProfilePicture(e.target.files[0])}
                    >              
                    </input>
                </ModalBody>
                <ModalFooter>
                    <CircularProgress hidden={confirmLoading}/>
                    <button hidden={!confirmLoading} className="btnClose" onClick={toggleModalChangeProfile}>Cancel</button>
                    <button hidden={!confirmLoading} onClick={handleUpdateProfile} className="btnSave">Save</button>
                </ModalFooter>
            </Modal>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
            <div className="container emp-profile">
                    <div className="row">
                        <div className="col-md-4">
                        <Skeleton hidden={isLoading} sx={{ height: 490, width: 350, borderRadius: 20 }} animation="wave" variant="rectangular" />
                            <img hidden={!isLoading} className="profilePic" src={profileData.ProfilePicture}/>
                        </div>
                        <div className="col-md-6">
                            <div className='profile-head'>
                            <Skeleton hidden={isLoading} animation="wave" height={10} width="40%" />
                                <h5 hidden={!isLoading}>{profileData.FirstName} {profileData.LastName}</h5>
                                <br hidden={isLoading}/>
                            <Skeleton hidden={isLoading} animation="wave" height={10} width="15%" />  
                                <h6 hidden ={!isLoading}>Pet Owner</h6>
                                <div className="col -md-8 pl-5">
                            <div className="tab-content profile-tab">
                                <div className="tab-panel">
                                <ul className="nav nav-tabs mt-5 mb-5" role="tablist">
                                    <li className="nav-item">
                                    <Skeleton hidden={isLoading} animation="wave" height={50} width="600%" />
                                        <a hidden={!isLoading} className="nav-link active" href="#">Profile</a>
                                    </li>
                                </ul>
                                    <div className="row">
                                        <div className = "col-md-6">
                                        <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" /> 
                                            <label hidden={!isLoading} className="labelTitle">First Name</label>
                                        </div>
                                        <div className = "col-md-6">
                                        <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                                            <label hidden={!isLoading} className="labelContext">{profileData.FirstName}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className = "col-md-6">
                                        <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                                            <label hidden={!isLoading} className="labelTitle">Last Name</label>
                                        </div>
                                        <div className = "col-md-6">
                                        <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                                            <label hidden={!isLoading} className="labelContext">{profileData.LastName}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className = "col-md-6">
                                        <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                                            <label hidden={!isLoading} className="labelTitle">Email</label>
                                        </div>
                                        <div className = "col-md-6">
                                        <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                                            <label hidden={!isLoading} className="labelContext">{profileData.EmailAddress}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className = "col-md-6">
                                        <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                                            <label hidden={!isLoading} className="labelTitle">Contact Number</label>
                                        </div>
                                        <div className = "col-md-6">
                                        <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                                            <label hidden={!isLoading} className="labelContext">{profileData.ContactNumber}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <Skeleton hidden={isLoading} animation="wave" height={50} width="70%" />
                            <button hidden={!isLoading} className='btnChangePass' onClick={toggleModalChangePass}>
                                Change Password
                            </button>
                            <Skeleton hidden={isLoading} animation="wave" height={50} width="70%" />
                            <button hidden={!isLoading} className='btnUpdate' onClick={toggleModalChangeProfile}>
                                Edit Profile 
                            </button>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default Profile
