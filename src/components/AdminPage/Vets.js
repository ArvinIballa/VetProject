import React, {useState, useEffect} from 'react'
import { Container } from 'reactstrap'
import AdminNavbar from './Navbar'
import api from '../../api/api'
import Moment from 'moment'
import Profile from '../../images/profile.png'
import { CircularProgress, TextField } from '@mui/material'

import {
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Input
} from 'reactstrap'

const Vets = () => {

    const getToken = sessionStorage.getItem('token')

    const [vetData, setVetData] = useState([])
    const [errorModal, setErrorModal] = useState(false)
    const [successModal, setSuccessModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [vetModal, setVetModal] = useState(false)
    const [vet_id, setVetID] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [phonenumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')
    const [cons_fee, setConsFee] = useState('')
    const [available_days, setAvailableDays] = useState('')


    const [doctor_id, setDoctorID] = useState('')

    const resetState = () => {
        setFirstName('')
        setLastName('')
        setPhoneNumber('')
        setEmail('')
        setDescription('')
        setConsFee('')
        setAvailableDays('')
        setVetID('')
    }
    const toggleDeleteModal = (doctor_id) => {
        setDoctorID(doctor_id)
        setDeleteModal(!deleteModal)
    }

    const toggleErrorModal = () => {
        setErrorModal(!errorModal)
    }

    const toggleCloseModal = () => {
        setVetModal(false)
    }

    const handleOk = () => {
        setSuccessModal(false)
        setDeleteModal(false)
    }

    const openEditVetModal = (vet_id, first_name, last_name, phonenumber, email, description, cons_fee, available_days) => {
        setVetModal(true)
        setVetID(vet_id)
        setFirstName(first_name)
        setLastName(last_name)
        setPhoneNumber(phonenumber)
        setEmail(email)
        setDescription(description)
        setConsFee(cons_fee)
        setAvailableDays(available_days)
    }

    const handleEdit = () => {
        setIsLoading(false)
        const VetPayload = {
            first_name,
            last_name,
            phonenumber,
            email,
            description,
            cons_fee,
            available_days
        }
        api.post(`Vets/edit/${vet_id}`, VetPayload, {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.message){
                setSuccessMessage(res.message)
                setSuccessModal(true)
                setVetModal(false)
                setIsLoading(true)
                getVets()
                resetState()
            }
        })
    }

    const handleDelete = () => {
        setIsLoading(false)
        api.delete(`Vets/delete_vet/${doctor_id}`, {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.message){
                setSuccessMessage(res.message)
                setSuccessModal(true)
                setDeleteModal(false)
                setIsLoading(true)
                setDoctorID('')
                getVets()
            }
            else{
                setErrorMessage('Something went wrong')
                setErrorModal(true)
                setIsLoading(true)
            }
        })
        .catch(err => {
            console.log(err.response)
            setErrorMessage('Something went wrong')
            setErrorModal(true)
            setIsLoading(true)
        })
    }



    const getVets = () => {
        api.get('Vets/list', {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.body){
                setVetData(res.body)
            }
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    useEffect(() => {
        getVets()
    }, [])

    return (
        <>
            <AdminNavbar/>
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
            <Modal centered backdrop="static" size="md" isOpen={deleteModal}>
                <ModalHeader>
                    Notice!
                </ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this?
                </ModalBody>
                <ModalFooter>
                    <CircularProgress hidden={isLoading} />
                    <button hidden={!isLoading} className="btnView" onClick={handleOk}>Close</button>
                    <button hidden={!isLoading} className="btnCancel" onClick={handleDelete}>Delete</button>
                </ModalFooter>
            </Modal>
             {/** MODAL EDIT VET */}
             <Modal centered backdrop="static" size="md" isOpen={vetModal}>
                <ModalHeader>
                    <h2>Edit Veterinarian</h2>
                </ModalHeader>
            <ModalBody>
                    <div>
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
                            label='Contact Number'
                            variant='outlined'
                            value={phonenumber}
                            style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                            onChange={e=> setPhoneNumber(e.target.value)}
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
                            label='Description'
                            value={description}
                            variant='outlined'
                            style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                            onChange={e=> setDescription(e.target.value)}
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
                            value={available_days}
                            variant='outlined'
                            style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                            onChange={e=> setAvailableDays(e.target.value)}
                        />            
                    </div>
                </ModalBody>
                <ModalFooter>
                    <CircularProgress hidden={isLoading}/>
                    <button hidden={!isLoading} onClick={toggleCloseModal} className='btnCancel'>CLOSE</button>
                    <button hidden={!isLoading} onClick={handleEdit} className='btnEdit'>EDIT</button>
                </ModalFooter>
            </Modal>
            <Container>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
            <div className='h2-wrapper'>  
                        <h2>Veterinarians<input
                            className='searchPatient'
                            placeholder='Search'
                        ></input></h2>
                </div>
            <div className="containerTable">             
                    <div className="tableWrapper">
                        <table>
                            <tr>
                                <th>Name</th>   
                                <th>Picture</th>                          
                                <th>Contact Number</th>
                                <th>Email Address</th>
                                <th>Action</th>
                            </tr>
                            {vetData.map((item)=> {
                                return(
                                    <tr>
                                        <td>{item.FirstName + ' ' + item.LastName}</td>
                                        <td>
                                            <a href={item.ProfilePicture} target='_blank'><img className='tableImg' src={item.ProfilePicture ? item.ProfilePicture : Profile}/></a>
                                        </td>
                                        <td>{item.ContactNumber}</td>
                                        <td style={{textTransform:'none'}}>{item.EmailAddress}</td>
                                        <td>
                                            <button className='btnView' onClick={()=> openEditVetModal(item.DoctorID, item.FirstName, item.LastName, item.ContactNumber, item.EmailAddress, item.Description, item.ConsultationFee, item.AvailableDays)}>View</button>
                                            <button onClick={()=> toggleDeleteModal(item.DoctorID)} className='btnCancel'>Delete</button>
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

export default Vets
