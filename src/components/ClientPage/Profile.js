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

import { TextField, Skeleton } from '@mui/material'
import { Navigate } from 'react-router-dom'


const Profile = () => {

    const getToken = sessionStorage.getItem('token')

    const [modalChangePass, setModalChangePass] = useState(false)

    const toggleModalChangePass = () => {
        setModalChangePass(!modalChangePass)
    }

    const [modalChangePic, setModalChangePic] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const toggleModalChangePic = () => {
        setModalChangePic(!modalChangePic)
    }

    const loading = () => {
        setIsLoading(false)
        setTimeout( ()=>
            doneLoading(), 
            10000
        );
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
                setIsLoading(true)
            }
            else{
                return null
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

    if(getToken == null){
        return <Navigate to = "/"/>
    }

    return (
        <>
            <VetNavbar/>
            {/** MODAL CHANGE PASSWORD */}
            <Modal centered backdrop='static' size='md' isOpen={modalChangePass}>
                <ModalHeader>
                    Change Password
                </ModalHeader>
                <ModalBody>
                    <TextField
                        label='Current Password'
                        variant='outlined'
                        style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                    />
                    <br/>
                    <TextField
                        label='Confirm Password'
                        variant='outlined'
                        style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                    />
                </ModalBody>
                <ModalFooter>
                    <button className="btnClose" onClick={toggleModalChangePass}>Cancel</button>
                    <button className="btnSave">Save</button>
                </ModalFooter>
            </Modal>
             {/** MODAL CHANGE PROFILE PICTURE */}
            <Modal centered backdrop='static' size='md' isOpen={modalChangePic}>
                <ModalHeader>
                    Change Profile Picture
                </ModalHeader>
                <ModalBody>
                <input type='file'></input>
                </ModalBody>
                <ModalFooter>
                    <button className="btnClose" onClick={toggleModalChangePic}>Cancel</button>
                    <button className="btnSave">Save</button>
                </ModalFooter>
            </Modal>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
            <div className="container emp-profile">
                    <div className="row">
                        <div className="col-md-4">
                        <Skeleton hidden={isLoading} sx={{ height: 490, width: 350, borderRadius: 20 }} animation="wave" variant="rectangular" />
                            <img hidden={!isLoading} className="profilePic" src={docpic}/>
                        </div>
                        <div className="col-md-6">
                            <div className='profile-head'>
                            <Skeleton hidden={isLoading} animation="wave" height={10} width="40%" />
                                <h5 hidden={!isLoading}>{profileData.FirstName} {profileData.LastName}</h5>
                                <br hidden={isLoading}/>
                            <Skeleton hidden={isLoading} animation="wave" height={10} width="15%" />  
                                <h6 hidden ={!isLoading}>Owner</h6>
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
                            <button hidden={!isLoading} className='btnUpdate' onClick={toggleModalChangePic}>
                                Edit Profile Picture
                            </button>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default Profile
