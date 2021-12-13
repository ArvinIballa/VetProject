import React, { useState, useEffect } from 'react'
import VetNavbar from './Navbar'
import './Profile.css'

import{
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody,
} from 'reactstrap'

import api from '../../api/api'

import { TextField, Skeleton, CircularProgress, FormControl, InputLabel, Select } from '@mui/material'
import { Navigate } from 'react-router-dom'


const Profile = () => {

    const timeData = [
        "8:00 AM",
        "9:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "1:00 PM",
        "2:00 PM",
        "3:00 PM",
        "4:00 PM",
        "5:00 PM",
        "6:00 PM",
        "7:00 PM",
        "8:00 PM",
        
    ]

    const getToken = sessionStorage.getItem('token')

    const [modalChangePass, setModalChangePass] = useState(false)
    const [modalChangeProfile, setModalChangeProfile] = useState(false)
    const [errorModal, setErrorModal] = useState(false)
    const [successModal, setSuccessModal] = useState(false)
    const [reloginModal, setReloginModal] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(false)
    const [reloginMessage, setReloginMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [confirmationMessage, setConfirmationMessage] = useState("")
    const [error, setError] = useState(0)

    const toggleModalChangePass = () => {
        setModalChangePass(!modalChangePass)
    }

    
    const [isLoading, setIsLoading] = useState(true)
    const [time, setTime] = useState('')
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
    const [message, setMessage] = useState('')
    const [modalAddDays, setModalAddDays] = useState(false)
    const [schedId, setSchedID] = useState('')
    const [isLoadingModal, setIsLoadingModal] = useState(true)
    const [description, setDescription] = useState('')
    const [cons_fee, setConsFee] = useState('')
    const [available_days, setAvailableDays] = useState('')
    
    

    const toggleAddTime = () => {
        setModalAddDays(!modalAddDays)
    }

    const toggleErrorModal = () => {
        setErrorModal(!errorModal)
    }

    const toggleConfirmationModal = (id) => {
        setConfirmationModal(!confirmationModal)
        setConfirmationMessage('Are you sure you want to delete this?')
        setSchedID(id)
    }


    const handleOk = () => {
        setSuccessModal(false)
        setModalChangeProfile(false)
        setModalChangePass(false)
        setModalAddDays(false)
        setConfirmationModal(false)
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
        getAvailableTime()
        setIsLoading(true)
        sessionStorage.setItem('void-wlcm-loading', true)
    }

    const [profileData, setProfileData] = useState([])

    const getProfile = () => {
        setIsLoading(false)
        api.get('Vets/profile', {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.body){
                setProfileData(res.body[0])
                setEmail(res.body[0].EmailAddress)
                setPhoneNumber(res.body[0].ContactNumber)
                setFirstName(res.body[0].FirstName)
                setLastName(res.body[0].LastName)
                setDescription(res.body[0].Description)
                setAvailableDays(res.body[0].AvailableDays)
                setConsFee(res.body[0].ConsultationFee)
                setIsLoading(true)
                setOldEmail(res.body[0].EmailAddress)
                sessionStorage.setItem('ID', res.body[0].DoctorID)
                sessionStorage.setItem('email', res.body[0].EmailAddress)
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

    const handleDelete = () => {
        setIsLoadingModal(false)
        api.get(`Schedules/delete/${schedId}`, {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res=> {
            console.log(res)
            if(res.message){
                setSuccessMessage(res.message)
                setSuccessModal(true)
                setIsLoadingModal(true)
                getAvailableTime()
            }
            else{
                return null
            }
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    const [availableTimeData, setAvailableTimeData] = useState([])

    const getAvailableTime = () => {
        api.get(`Schedules/list`, {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.body){
                setAvailableTimeData(res.body)
            }
            else{
                setMessage(res.message)
                return false
            }
                
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    const handleAddTime = () => {
        setIsLoadingModal(false)
        const timePayload = {
            time
        }
        api.post('Schedules', timePayload, {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res=> {
            console.log(res)
            if(res.message == 'An error occured.'){
                setErrorModal(true)
                setErrorMessage(res.message)
                setIsLoadingModal(true)
                return false
            }
            else if(res.message){
                setSuccessMessage(res.message)
                setSuccessModal(true)
                setTime('')
                setMessage('')
                getAvailableTime()
                setIsLoadingModal(true)
            }
            else
                return null
        })
        .catch(err => {
            console.log(err.response)
        })
    } 
    const handleUpdateProfile = () => {
        setConfirmLoading(false)
        let formdata = new FormData()
        formdata.append('first_name', first_name)
        formdata.append('last_name', last_name)
        formdata.append('phonenumber', phonenumber)
        formdata.append('email', email)
        formdata.append('description', description)
        formdata.append('cons_fee', cons_fee)
        formdata.append('available_days', available_days)
        formdata.append('profile_picture', profile_picture ? profile_picture : null)
        
        if(first_name == "" || last_name == "" || phonenumber == "" || email == ""){
            setErrorMessage('All fields are required.')
            setErrorModal(true)
            setConfirmLoading(true)
            return false
        }
        
        if(oldEmail != email){
            api.post('Vets/update', formdata, {headers: {Authorization: `Bearer ${getToken}`}})
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
            api.post('Vets/update', formdata, {headers: {Authorization: `Bearer ${getToken}`}})
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
        api.post('Vets/update_password', changePassPayload, {headers: {Authorization: `Bearer ${getToken}`}})
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
            getAvailableTime()
        }
    }, [])

    if(redirect == true){
        return <Navigate to = "/signinvet"/>
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
            {/** DELETE MODAL */}
            <Modal centered backdrop="static" size="md" isOpen={confirmationModal}>
                <ModalHeader>
                    Notice!
                </ModalHeader>
                <ModalBody>
                    {confirmationMessage}
                </ModalBody>
                <ModalFooter>
                <CircularProgress hidden={isLoadingModal}/>
                <button hidden={!isLoadingModal} className="btnView" onClick={toggleConfirmationModal}>Cancel</button>
                <button hidden={!isLoadingModal} className="btnCancel" onClick={handleDelete}>Delete</button>
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
                    <br/>
                    <TextField
                        label='Consultation Fee'
                        value={cons_fee}
                        variant='outlined'
                        style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                        onChange={e=> setConsFee(e.target.value)}
                    />
                    <br/>
                    <TextField
                        label='Available Days'
                        helperText={'(e.g Tuesday, Friday, Saturday)'}
                        value={available_days}
                        variant='outlined'
                        style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                        onChange={e=> setAvailableDays(e.target.value)}
                    />
                    <br/>
                    <TextField
                        label='Description'
                        value={description}
                        multiline
                        rows={3}
                        variant='outlined'
                        style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                        onChange={e=> setDescription(e.target.value)}
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
                    <button hidden={!confirmLoading} className="btnCancel" onClick={toggleModalChangeProfile}>Cancel</button>
                    <button hidden={!confirmLoading} onClick={handleUpdateProfile} className="btnAdd">Save</button>
                </ModalFooter>
            </Modal>
            {/** ADD AVAILABLE TIME MODAL */}
            <Modal centered backdrop="static" size="md" isOpen={modalAddDays}>
                <ModalHeader>
                    Add Available Days
                </ModalHeader>
                <ModalBody>
                <FormControl error={error == 1 && time == ""} variant="outlined" style={{width: '100%', height: '10%'}}>
                            <InputLabel style={{marginLeft: '30px'}} >Time</InputLabel>
                            <Select                              
                                native
                                style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                                label="MyPet"
                                onChange={e=> setTime(e.target.value)}
                            >
                            <option selected disabled>Select</option>
                            {timeData.map((item)=> {
                                return(
                                    <option value={item}>{item}</option>
                                )
                            })}                          
                            </Select>
                        </FormControl>
                </ModalBody>
                <ModalFooter>
                <CircularProgress hidden={isLoadingModal}/>
                <button hidden={!isLoadingModal} className="btnCancel" onClick={toggleAddTime}>Cancel</button>
                <button hidden={!isLoadingModal} className="btnAdd" onClick={handleAddTime}>OK</button>
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
                                <h6 hidden ={!isLoading}>Veterinarian Doctor</h6>
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
                                    <div className="row">
                                        <div className = "col-md-6">
                                            <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                                            <label hidden={!isLoading} className="labelTitle">Description</label>
                                        </div>
                                        <div className = "col-md-6">
                                            <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                                            <label hidden={!isLoading} className="labelContext">{profileData.Description ? profileData.Description : ""}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className = "col-md-6">
                                            <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                                            <label hidden={!isLoading} className="labelTitle">Available Days</label>
                                        </div>
                                        <div className = "col-md-6">
                                            <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                                            <label hidden={!isLoading} className="labelContext">{profileData.AvailableDays ? profileData.AvailableDays : ""}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className = "col-md-6">
                                            <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                                            <label hidden={!isLoading} className="labelTitle">Consultation Fee</label>
                                        </div>
                                        <div className = "col-md-6">
                                            <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                                            <label hidden={!isLoading} className="labelContext">{profileData.ConsultationFee ? profileData.ConsultationFee : ""}</label>
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

                    <div className='h2-wrapper'> 
                        <Skeleton hidden={isLoading} animation="wave" height={50} width="20%" /> 
                        <h2 hidden={!isLoading}>My Available Time <button hidden={!isLoading} className='btnAdd' onClick={toggleAddTime}>
                                + Add Time
                            </button></h2>
                    </div>
                <div className="containerTable">  
                <Skeleton hidden={isLoading} animation="wave" height={200} width="100%" />           
                    <div hidden={!isLoading} className="tableWrapper">
                        <table>
                            <tr>
                                <th></th>               
                                <th scope="col">Time</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th scope="col">Action</th>
                            </tr>
                            <h5 hidden={message == ''} className='info'>{message}</h5>
                            {availableTimeData.map((item)=> {
                                return (
                                    <tr>
                                        <td></td>    
                                        <td scope="row">{item.Time}</td> 
                                        <td></td>   
                                        <td></td>     
                                        <td></td>     
                                        <td></td>      
                                        <td></td>     
                                        <td></td>     
                                        <td></td>                                  
                                        <td>
                                            <button onClick={()=>toggleConfirmationModal(item.ScheduleID)} className="btnCancel">Delete</button>
                                        </td>
                                </tr>       
                                )
                            })}                                               
                        </table>
                    </div>
                </div>
                <br/> <br/> <br/>
            </div>
        </>
    )
}

export default Profile