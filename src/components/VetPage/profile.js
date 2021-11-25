import React, { useState } from 'react'
import docpic from '../../images/doctor3.jpg'
import VetNavbar from './Navbar'
import './Profile.css'

import{
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody,
} from 'reactstrap'

import { TextField } from '@mui/material'


const Profile = () => {

    const [modalChangePass, setModalChangePass] = useState(false)

    const toggleModalChangePass = () => {
        setModalChangePass(!modalChangePass)
    }

    const [modalChangePic, setModalChangePic] = useState(false)

    const toggleModalChangePic = () => {
        setModalChangePic(!modalChangePic)
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
                            <img className="profilePic" src={docpic}/>
                        </div>
                        <div className="col-md-6">
                            <div className='profile-head'>
                                <h5>Arvin Iballa</h5>
                                <h6>Veterinarian Doctor</h6>
                                <div className="col -md-8 pl-5">
                            <div className="tab-content profile-tab">
                                <div className="tab-panel">
                                <ul className="nav nav-tabs mt-5 mb-5" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">Profile</a>
                                    </li>
                                </ul>
                                    <div className="row">
                                        <div className = "col-md-6">
                                            <label className="labelTitle">First Name</label>
                                        </div>
                                        <div className = "col-md-6">
                                            <label className="labelContext">Arvin</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className = "col-md-6">
                                            <label className="labelTitle">Last Name</label>
                                        </div>
                                        <div className = "col-md-6">
                                            <label className="labelContext">Iballa</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className = "col-md-6">
                                            <label className="labelTitle">Email</label>
                                        </div>
                                        <div className = "col-md-6">
                                            <label className="labelContext">arviniballa6@gmail.com</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className = "col-md-6">
                                            <label className="labelTitle">Contact Number</label>
                                        </div>
                                        <div className = "col-md-6">
                                            <label className="labelContext">02222222222</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className = "col-md-6">
                                            <label className="labelTitle">Description</label>
                                        </div>
                                        <div className = "col-md-6">
                                            <label className="labelContext">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                           <button className='btnChangePass' onClick={toggleModalChangePass}>
                               Change Password
                           </button>
                           <button className='btnUpdate' onClick={toggleModalChangePic}>
                               Edit Profile Picture
                           </button>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default Profile
