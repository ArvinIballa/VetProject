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
import { CircularProgress, TextField } from '@mui/material'

const Consultations = () => {
   
    const getToken = sessionStorage.getItem('token')

    const [consultData, setConsultData] = useState([])
    const [message, setMessage] = useState('')
    const [errorModal, setErrorModal] = useState(false)
    const [successModal, setSuccessModal] = useState(false)
    const [noticeModal, setNoticeModal] = useState(false)
    const [adviseModal, setAdviseModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(false)
    const [confirmationMessage, setConfirmationMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [noticeMessage, setNoticeMessage] = useState("")
    const [deleteMessage, setDeleteMessage] = useState("")
    const [adviseMessage, setAdviseMessage] = useState("")
    const [noticeTitle, setNoticeTitle] = useState("")
    const [authUrl, setAuthUrl] = useState("")
    const [status, setStatus] = useState('')
    const [consultationID, setConsultationID] = useState('')
    const [fullyPaidModal, setFullyPaidModal] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [modalMessage, setModalMessage] = useState(false)
    const [id, setID] = useState('')
    const [confirming, setConfirming] = useState(true)
    const [confirmMessage, setConfirmMessage] = useState("")
    const [search, setSearch] = useState("")
    const [modalComplaint, setModalComplaint] = useState(false)
    const [complaintMessage, setComplaintMessage] = useState("")

    const toggleMessageModal = (id) => {
        setModalMessage(!modalMessage)
        setID(id)
        
    }

    const toggleDeleteModal = (id) => {
        setID(id)
        setDeleteModal(!deleteModal)
        setDeleteMessage('Are you sure you want to cancel this appointment?')
    }


    const toggleErrorModal = () => {
        setErrorModal(!errorModal)
        
    }


    const toggleFullyPaidModal = (id) => {
        setFullyPaidModal(!fullyPaidModal)
        setConsultationID(id)
    }

    const toggleConfirmationModal = () => {
        setConfirmationModal(!confirmationModal)
    }

    const handleOk = () => {
        setSuccessModal(false)
        setConfirmationModal(false)
        setFullyPaidModal(false)
        setModalMessage(false)
        setDeleteModal(false)
        setModalComplaint(false)
    }

    const handleConfirming = () => {
        setAdviseModal(false)
        getConsultations()
    }

    const toggleModalComplaint = (InitialComplaint) => {
        setModalComplaint(!modalComplaint)
        setComplaintMessage(InitialComplaint)
    }

    const toggleAdviseModal = () => {
        setConfirming(true)
        setConfirmMessage('Confirming Payment ....')
        setAdviseModal(!adviseModal)
        setConfirmationModal(!confirmationModal)
        setTimeout(() => {
            setConfirming(false)
            setConfirmMessage('Successfully paid!')
        }, 20000);
    }

    const handleOkNewTab = () => {
        window.close() 
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

    const handleMarkAsPaid = (id, status) => {
        if(status == 'paid'){
            api.get(`Consultations/get_auth_url/${id}`, {headers: {Authorization: `Bearer ${getToken}`}})
            .then(res => {
                console.log(res)
                if(res){               
                    setAuthUrl(res.auth_url)
                    setConfirmationModal(true)
                    setConfirmationMessage('Are you sure you want to mark this as paid?')
                }
                else
                    return null
            })
            .catch(err => {
                console.log(err.response)
            })
        }
        else{
            setStatus(status)
            setConsultationID(id)
        }
    }

    const handleDelete = () => {
        api.get(`Consultations/mark_as_cancelled/${id}`, {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.message){
                setSuccessMessage(res.message)
                setSuccessModal(true) 
                getConsultations()           
            }
            else
                return null
        })
        .catch(err=> {
            console.log(err.response)
        })
    }

    const handleFullyPaid = () => {
        setIsLoading(false)
        api.get(`Consultations/mark_as_fully_paid/${consultationID}`, {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res=> {
            console.log(res)
            if(res.message){
                setSuccessMessage(res.message)
                setSuccessModal(true)
                setIsLoading(true)
                getConsultations()
            }
            else
                return null
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    const handleConfirm = () => {
        toggleAdviseModal()
    }

    useEffect(() => {
        getConsultations()
        if(window.location.href.split('/')[5]== '?success'){
            console.log(window.location.href)
            getConsultations()
            setNoticeTitle('Success!')
            setNoticeMessage('Successfully marked consultation appointment as paid.')
            setNoticeModal(true)
        }
        else if(window.location.href.split('/')[5]== '?error'){
            setNoticeTitle('Notice!')
            setNoticeMessage('Failed to mark as paid')
            setNoticeModal(true)
        }

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
             {/** NOTICE MODAL */}
            <Modal centered backdrop="static" size="md" isOpen={noticeModal}>
                <ModalHeader>
                    {noticeTitle}
                </ModalHeader>
                <ModalBody>
                    {noticeMessage}
                </ModalBody>
                <ModalFooter>
                <button className="btnAdd" onClick={handleOkNewTab}>OK</button>
                </ModalFooter>
            </Modal>
            {/** ADVISE TO ADMIN MODAL */}
            <Modal centered backdrop="static" size="md" isOpen={adviseModal}>
                <ModalHeader>
                    Notice!
                </ModalHeader>
                <ModalBody>
                    {confirmMessage}
                </ModalBody>
                <ModalFooter>
                    <button className="btnAdd" hidden={confirming} onClick={handleConfirming}>Ok</button>
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
                    <a href={authUrl} target='_blank'><button hidden={!isLoading} onClick={handleConfirm} className="btnAdd">OK</button></a>
                </ModalFooter>
            </Modal> 
             {/** COMPLAINT MODAL */}
             <Modal centered backdrop="static" size="md" isOpen={modalComplaint}>
                <ModalHeader>
                    Complaint
                </ModalHeader>
                <ModalBody>
                   {complaintMessage}
                </ModalBody>
                <ModalFooter>
                    <button className="btnAdd" onClick={handleOk}>Ok</button>
                </ModalFooter>
            </Modal>
             {/** CONFIRMATION MODAL FOR FULLY PAID */}
            <Modal centered backdrop="static" size="md" isOpen={fullyPaidModal}>
                <ModalHeader>
                    Notice!
                </ModalHeader>
                <ModalBody>
                    Are you sure you want to mark this as fully paid?
                </ModalBody>
                <ModalFooter>
                    <CircularProgress hidden={isLoading} />
                    <button hidden={!isLoading} className="btnCancel" onClick={toggleFullyPaidModal}>Cancel</button>
                    <button hidden={!isLoading} onClick={handleFullyPaid} className="btnAdd">OK</button>
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
                <div className='h2-wrapper'>  
                        <h2>Consultations   <input
                            className='searchPatient'
                            placeholder='Search Pet Name'
                            onChange={e=> setSearch(e.target.value)}
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
                                <th>Complaint</th>
                                <th>Meet Link</th>
                                <th>Consultation Fee</th>
                                <th>Reservation Fee</th>
                                <th>Reservation Reference</th>
                                <th>Balance</th>
                                <th>Balance Reference</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            {consultData.filter((val)=> {
                                if(search == ""){
                                    return val
                                }
                                else if(val.PetName.toLowerCase().includes(search.toLowerCase())){
                                    return val
                                }
                            }).map((item)=> {
                                return(
                                    <tr>
                                        <td className='date'>{Moment(item.Date).format('LL')}</td>
                                        <td>{item.Time}</td>
                                        <td>{item.DoctorName}</td>
                                        <td>{item.OwnerName}</td>
                                        <td>{item.PetName}</td>
                                        <td onClick={ item.InitialComplaint ? ()=> toggleModalComplaint(item.InitialComplaint) : null} style={item.InitialComplaint ? {fontWeight:'bold', color:'#00b8d4', cursor:'pointer'}:null}>{item.InitialComplaint ? 'View Complaint' : 'No Complaint'}</td>
                                        <td style={{textTransform:'none'}}><a href={item.GoogleMeetLink}>{item.GoogleMeetLink ? item.GoogleMeetLink : "Meet link not available yet."}</a></td>
                                        <td>{item.ConsultationFee}</td>
                                        <td>{item.ReservationFee}</td>
                                        <td style={{textAlign:'center'}}>
                                            <a target='_blank' href={item.ReservationReference}><img className='tableImg' src={item.ReservationReference}/></a>
                                        </td>
                                        <td>{item.Balance}</td>  
                                        <td style={{textAlign:'center'}}>
                                            <a hidden={item.BalanceReference == null} target='_blank' href={item.BalanceReference}><img className='tableImg' src={item.BalanceReference}/></a>
                                        </td> 
                                        <td>{item.Status}</td>                         
                                        <td>
                                            <button className='btnMessage' onClick={()=>toggleMessageModal(item.ConsultationID)}>Message</button>
                                            <button hidden={item.Status == "PENDING" ? false : item.Status == "DONE, FOR FULL PAYMENT" ? false : true } onClick={item.Status =='PENDING' ? ()=>handleMarkAsPaid(item.ConsultationID, 'paid') : ()=>toggleFullyPaidModal(item.ConsultationID, 'fully-paid')} className={item.Status == "PENDING" ? 'btnView' : 'btnInfo'}><label className='status'>{item.Status == "PENDING" ? "Mark as Paid" : item.Status == "DONE, FOR FULL PAYMENT" ? "Mark as Fully Paid" : " "}</label></button>
                                            <button hidden={item.Status == 'DONE, FULLY PAID' || item.Status == 'CANCELLED'} onClick={()=>toggleDeleteModal(item.ConsultationID)} className="btnCancel">Cancel</button>
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
