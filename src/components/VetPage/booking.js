import React, { useEffect, useState } from 'react'
import VetNavbar from './Navbar'
import { CircularProgress, Container, TextField } from '@mui/material'
import './booking.css'
import Moment from 'moment'
import api from '../../api/api'

import {
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
} from 'reactstrap'


const Booking = () => {

    const getToken = sessionStorage.getItem('token')

    const [consultData, setConsultData] = useState([])
    const [message, setMessage] = useState('')
    const [invalidText, setInvalidText] = useState('')
 
    const [errorModal, setErrorModal] = useState(false)
    const [successModal, setSuccessModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(false)
    const [confirmationMessage, setConfirmationMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [deleteMessage, setDeleteMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [id, setID] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [statusOfConfirmation, setStatusOfConfirmation] = useState('')
    const [modalMessage, setModalMessage] = useState(false)
    

    const toggleErrorModal = () => {
        setErrorModal(!errorModal)
        
    }

    const toggleMessageModal = (id) => {
        setModalMessage(!modalMessage)
        setID(id)
        
    }

    const toggleDeleteModal = (id) => {
        setID(id)
        setDeleteModal(!deleteModal)
        setDeleteMessage('Are you sure you want to cancel this appointment?')
    }

    const toggleConfirmationModal = () => {
        setConfirmationModal(!confirmationModal)
        
    }

    const handleOk = () => {
        setSuccessModal(false)
        setConfirmationModal(false)
        setModalMessage(false)
        setDeleteModal(false)
    }

    const openModalMarkAsConfirm = (id, statusOfConfirmation) => {
        setConfirmationModal(true)
        if(statusOfConfirmation == 1){
            setConfirmationMessage('Are you sure you want mark this as done?')
        }
        else{
            setConfirmationMessage('Are you sure you want mark this as confirmed?')
        }
        setID(id)
        setStatusOfConfirmation(statusOfConfirmation)
    }

    const handleConfirm = () => {
        setIsLoading(false)
        if(statusOfConfirmation == 0){
            api.get(`Consultations/mark_as_confirmed/${id}`, {headers: {Authorization: `Bearer ${getToken}`}})
            .then(res=> {
                console.log(res, parseInt(id),`Consultations/mark_as_confirmed/${parseInt(id)}`)
                if(res.message){
                    setSuccessModal(true)
                    setSuccessMessage(res.message)
                    setIsLoading(true)
                    getBookings()
                }
                else
                    return null
            })
            .catch(err => {
                console.log(err.response)
            })
        }
        else{
            api.get(`Consultations/mark_as_done/${id}`, {headers: {Authorization: `Bearer ${getToken}`}})
            .then(res=> {
                console.log(res, parseInt(id),`Consultations/mark_as_confirmed/${parseInt(id)}`)
                if(res.message){
                    setSuccessModal(true)
                    setSuccessMessage(res.message)
                    setIsLoading(true)
                    getBookings()
                }
                else
                    return null
            })
            .catch(err => {
                console.log(err.response)
            })
        }
    }

    const getBookings = () => {
        api.get('Consultations/list', {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.body){
                setConsultData(res.body)
            }
            else{
                setInvalidText(res.message)
            }
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    const handleDelete = () => {
        api.get(`Consultations/mark_as_cancelled/${id}`, {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.message){
                setSuccessMessage(res.message)
                setSuccessModal(true) 
                getBookings()           
            }
            else
                return null
        })
        .catch(err=> {
            console.log(err.response)
        })
    }


    const handleMessage = () => {
        setIsLoading(false)
        const messagePayload = {
            message
        }
        api.post(`Consultations/message_client/${id}`, messagePayload, {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.message){
                setSuccessModal(true)
                setSuccessMessage(res.message)
                setMessage('')
                setIsLoading(true)
            }
            else
                return null
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    useEffect(() => {
        getBookings()
    }, [])

    return (
        <>
            <VetNavbar/> 
            <Container>
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
                    {deleteMessage}
                </ModalBody>
                <ModalFooter>
                <button className="btnView" onClick={toggleDeleteModal}>Close</button>
                <button className="btnCancel" onClick={handleDelete}>Cancel</button>
                </ModalFooter>
            </Modal> 
            {/** CONFIRMATION MODAL */}
            <Modal centered backdrop="static" size="md" isOpen={confirmationModal}>
                <ModalHeader>
                    Notice!
                </ModalHeader>
                <ModalBody>
                    {confirmationMessage}
                </ModalBody>
                <ModalFooter>
                    <CircularProgress hidden={isLoading}/>
                    <button hidden={!isLoading} className="btnCancel" onClick={toggleConfirmationModal}>Cancel</button>
                    <button hidden={!isLoading} className="btnAdd" onClick={handleConfirm}>OK</button>
                </ModalFooter>
            </Modal> 

            {/** MESSAGE MODAL */}
            <Modal centered backdrop="static" size="md" isOpen={modalMessage}>
                <ModalHeader>
                    Message Owner
                </ModalHeader>
                <ModalBody>
                <TextField
                    label='Message'
                    variant='outlined'
                    multiline
                    rows={4}
                    style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                    onChange={e=> setMessage(e.target.value)}
                    />
                    <br/>
                </ModalBody>
                <ModalFooter>
                    <CircularProgress hidden={isLoading}/>
                    <button hidden={!isLoading} className="btnCancel" onClick={toggleMessageModal}>Cancel</button>
                    <button hidden={!isLoading} className="btnAdd" onClick={handleMessage}>Send</button>
                </ModalFooter>
            </Modal> 
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
                <div className='h2-wrapper'>  
                        <h2>Bookings   <input
                            className='searchPatient'
                            placeholder='Search'
                        ></input></h2>
                </div>
                <div className="containerTable">             
                    <div className="tableWrapper">
                        <table>
                            <tr>
                                <th>Date</th>   
                                <th>Time</th>                          
                                <th>Doctor's Name</th>
                                <th>Owner's Name</th>
                                <th>Pet Name</th>
                                <th>Meet Link</th>
                                <th>Consultation Fee</th>
                                <th>Reservation Fee</th>
                                <th>Reservation Reference</th>
                                <th>Balance</th>
                                <th>Balance Reference</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            <h5 hidden={invalidText == ""} className='info'>{invalidText}</h5>
                            {consultData.map((item)=> {
                                return (
                                    <tr>
                                        <td className='date'>{Moment(item.date).format('LL')}</td>
                                        <td>{item.Time}</td>
                                        <td>{item.DoctorName}</td>
                                        <td>{item.OwnerName}</td>
                                        <td>{item.PetName}</td>
                                        <td><a href={item.GoogleMeetLink}>{item.GoogleMeetLink}</a></td>
                                        <td>{item.ConsultationFee}</td>
                                        <td>{item.ReservationFee}</td>
                                        <td style={{textAlign:'center'}}>
                                            <a target='_blank' href={item.ReservationReference}><img className='tableImg' src={item.ReservationReference}/></a>
                                        </td>
                                        <td>{item.Balance}</td>   
                                        <td style={{textAlign:'center'}}>
                                            <a hidden={item.BalanceReference == null} target='_blank' href={item.BalanceReference}><img className='tableImg' src={item.BalanceReference}/></a>
                                        </td> 
                                        <td>
                                            <label>{item.Status}</label>
                                        </td>                         
                                        <td>
                                            <button className='btnMessage' onClick={()=>toggleMessageModal(item.ConsultationID)}>Message</button>
                                            <button hidden={item.Status == "RESERVATION PAID" ? false : item.Status == "CONFIRMED" ? false : true} className="btnView" onClick={item.Status=='CONFIRMED' ? ()=>openModalMarkAsConfirm(item.ConsultationID, 1) : ()=>openModalMarkAsConfirm(item.ConsultationID, 0)}><label className="status">{item.Status=='RESERVATION PAID' ? 'Mark as Confirmed' : item.Status=='CONFIRMED' ? 'Mark as Done' : ''}</label></button>
                                            <button hidden={item.Status == "RESERVATION PAID" ? false : item.Status == "CONFIRMED" ? false : true} onClick={()=>toggleDeleteModal(item.ConsultationID)} className="btnCancel">Cancel</button>
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

export default Booking
