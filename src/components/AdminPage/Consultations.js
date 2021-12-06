import React, {useState, useEffect} from 'react'
import { Container } from 'reactstrap'
import AdminNavbar from './Navbar'
import api from '../../api/api'
import Moment from 'moment'

import {
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
} from 'reactstrap'

const Consultations = () => {

    const getToken = sessionStorage.getItem('token')

    const [consultData, setConsultData] = useState([])

    const [errorModal, setErrorModal] = useState(false)
    const [successModal, setSuccessModal] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(false)
    const [confirmationMessage, setConfirmationMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [authUrl, setAuthUrl] = useState("")

    const toggleErrorModal = () => {
        setErrorModal(!errorModal)
        
    }

    const toggleConfirmationModal = () => {
        setConfirmationModal(!confirmationModal)
        
    }

    const handleOk = () => {
        setSuccessModal(false)
        setConfirmationModal(false)
    }

    const getConsultations = () => {
        api.get('Consultations/list_all',  {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.body){
                setConsultData(res.body)
            }
            else
                return null
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    const handleMarkAsPaid = (id) => {
        api.get(`Consultations/get_auth_url/${id}`, {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res){               
                setAuthUrl(res.auth_url)
                setConfirmationModal(true)
                setConfirmationMessage('Are you sure you want to mark this as done?')
            }
            else
                return null
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    const handleConfirm = () => {
        setSuccessMessage('Successfully marked consultation appointment as paid.')
        setSuccessModal(true)
        getConsultations()
    }

    useEffect(() => {
        getConsultations()
    }, [])

    return (
        <>
            <AdminNavbar/>
            <Container>
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
             {/** CONFIRMATION MODAL */}
            <Modal centered backdrop="static" size="md" isOpen={confirmationModal}>
                <ModalHeader>
                    Notice!
                </ModalHeader>
                <ModalBody>
                    {confirmationMessage}
                </ModalBody>
                <ModalFooter>
                    <button className="btnCancel" onClick={toggleConfirmationModal}>Cancel</button>
                    <a href={authUrl} target='_blank'><button onClick={handleConfirm} className="btnAdd">OK</button></a>
                </ModalFooter>
            </Modal> 
                <div className='h2-wrapper'>  
                        <h2>Consultations   <input
                            className='searchPatient'
                            placeholder='Search'
                        ></input></h2>
                </div>
                <div className="table-responsive containerTable">             
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
                                <th>Action</th>
                            </tr>
                            {consultData.map((item)=> {
                                return(
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
                                            <button hidden={item.Status != "PENDING"} onClick={()=>handleMarkAsPaid(item.ConsultationID)} className="btnView">{item.Status == "PENDING" ? "Mark as Paid" : " "}</button>
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

export default Consultations
