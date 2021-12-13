import React, { useEffect, useState } from 'react'
import { CircularProgress, Container } from '@mui/material'
import VetNavbar from './Navbar'
import './patients.css'
import api from '../../api/api'
import Profile from '../../images/profile.png'
import * as IoIcons from 'react-icons/io5'
import {
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Input
} from 'reactstrap'
import { TextField } from '@mui/material'
import moment from 'moment'

const Patients = () => {

    const getToken = sessionStorage.getItem('token')
    const getID = sessionStorage.getItem('ID')
    const [ownerModal, setOwnerModal] = useState('')
    const [specificOwnerData, setSpecificOwnerData] = useState([])
    const [message, setMessage] = useState('')
    const [search, setSearch] = useState('')
    const [petOwnerData, setPetOwnerData] = useState([])
    const [medicalData, setMedicalData] = useState([])
    const [modalAddMedicalRecord, setModalAddMedicalRecord] = useState(false)
    const [petID, setPetID] = useState('')
    const [subject, setSubject] = useState('')
    const [remarks, setRemarks] = useState('')
    const [error, setError] = useState(1)
    const [errorModal, setErrorModal] = useState(false)
    const [successModal, setSuccessModal] = useState(false)
    const [modalMedicalRecords, setModalMedicalRecords] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [attachment, setAttachment] = useState('')
    const [modalRemarks, setModalRemarks] = useState(false)
    const [remarkMessage, setRemarkMessage] = useState('')
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [record_id, setRecordID] = useState('')
    

    const toggleModalMedicalRecords = () => {
        setModalMedicalRecords(!modalMedicalRecords)
        setOwnerModal(!ownerModal)
    }

    const toggleModalRemarks = (remarks) => {
        setModalRemarks(!modalRemarks)
        setRemarkMessage(remarks)
    }

    const toggleEditModal = (record_id, subject, remarks, attachment) => {
        setRecordID(record_id)
        setSubject(subject)
        setRemarks(remarks)
        setAttachment(attachment)
        setEditModal(!editModal)
        setModalMedicalRecords(!modalMedicalRecords)
    }


    const toggleOwnerModal = () => {
        setOwnerModal(!ownerModal)
        setError(0)
        
    }

    const toggleErrorModal = () => {
        setErrorModal(!errorModal)
        
    }

    const resetState = () => {
        setSubject('')
        setRemarks('')
    }

    const toggleAddMedicalRecord = (pet_id) => {
        setOwnerModal(!ownerModal)
        setModalAddMedicalRecord(!modalAddMedicalRecord)
        setPetID(pet_id)
    }

    const toggleDeleteModal = (record_id) => {
        setRecordID(record_id)
        setDeleteModal(!deleteModal)
        setModalMedicalRecords(!modalMedicalRecords)
    }

    const handleDelete = () => {
        setIsLoading(false)
        api.delete(`MedRecords/delete_med_rec/${record_id}`, {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.message){
                setSuccessModal(true)
                setSuccessMessage(res.message)
                setRecordID('')
                setDeleteModal(false)
                setIsLoading(true)
            }
            else
                return null
        })
        .catch(err => {
            console.log(err.response)
        })
    }


    const handleEdit = () => {
        setIsLoading(false)
        let formdata = new FormData()
        formdata.append('subject', subject)
        formdata.append('remarks', remarks)
        formdata.append('attachment', attachment ? attachment : null)
        
        if(subject == "" || remarks == ""){
            setErrorModal(true)
            setErrorMessage('All fields are required.')
            setError(1)
            setIsLoading(true)
            return false
        }
        
        api.post(`MedRecords/edit_med_record/${record_id}`, formdata, {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.message){
                setSuccessModal(true)
                setSuccessMessage(res.message)
                setIsLoading(true)
                resetState()
            }
            else
                return null
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    const addMedicalRecord = () => {
        setIsLoading(false)
        let formdata = new FormData()
        formdata.append('pet', petID)
        formdata.append('subject', subject)
        formdata.append('remarks', remarks)
        formdata.append('attachment', attachment ? attachment : null)
        
        if(subject == "" || remarks == ""){
            setErrorModal(true)
            setErrorMessage('All fields are required.')
            setError(1)
            setIsLoading(true)
            return false
        }
        
        api.post('MedRecords', formdata, {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.message){
                setSuccessModal(true)
                setSuccessMessage(res.message)
                setIsLoading(true)
                resetState()
            }
            else
                return null
        })
        .catch(err => {
            console.log(err.response)
        })
    }


    const handleOk = () => {
        setOwnerModal(false)
        setMessage('')
        setSpecificOwnerData([])
        setSuccessModal(false)
        setModalAddMedicalRecord(false)
        setEditModal(false)
    }

    const getMedicalRecords = (pet_id) => {
        const medicalPayload = {
            pet_id
        }
        api.post('MedRecords/list', medicalPayload ,{headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.message == 'No pet medical records yet.'){
                setErrorModal(true)
                setErrorMessage(res.message)
                return false
            }
            else{
                setModalMedicalRecords(true)
                setMedicalData(res.body)
                toggleOwnerModal()
            }
        })
        .catch(err => {
            console.log(err.response)
        })
    }


    const getPetOwner = () => {
        api.get(`Consultations/owners_per_doctor/${getID}`, {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.message){
                setMessage(res.message)
            }
            else{
                setPetOwnerData(res.body)
            }
            
        })
        .catch(err => {
            console.log(err.response)
        })
    }
    const [firstname, setFirstname] = useState('')
    const getSpecificOwner = (owner_id, firstname) => {
        setFirstname(firstname)
        console.log(owner_id)
        api.get(`Pets/list_pet_owner/${owner_id}`, {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.body){
                setSpecificOwnerData(res.body)
                toggleOwnerModal()
            }
            else{
                toggleOwnerModal()
                setMessage(res.message)
            }
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    useEffect(() => {
        getPetOwner()
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
            {/** REMARKS MODAL */}
            <Modal centered backdrop="static" size="md" isOpen={modalRemarks}>
                <ModalHeader>
                    Remarks
                </ModalHeader>
                <ModalBody>
                    {remarkMessage}
                </ModalBody>
                <ModalFooter>
                    <button className='btnAdd' onClick={()=> setModalRemarks(false)}>Ok</button>
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
                    <button hidden={!isLoading} className='btnView' onClick={toggleDeleteModal}><IoIcons.IoReturnUpBackOutline/> Back</button>
                    <button hidden={!isLoading} className='btnCancel' onClick={handleDelete}>Delete</button>
                </ModalFooter>
            </Modal>
            {/** MODAL VIEW MEDICAL RESULTS */}
            <Modal centered backdrop='static' size='xl
            ' isOpen={modalMedicalRecords}>
                <ModalHeader>
                    <h2>Medical Records</h2>
                </ModalHeader>
                <ModalBody>
                    <div className="containerTable">             
                        <div className="tableWrapper">
                            <table>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Doctor Name</th>
                                    <th scope="col">Pet Name</th>
                                    <th scope="col">Subject</th>
                                    <th>Attachment</th>
                                    <th scope="col">Remarks</th>
                                    <th>Action</th>
                                </tr>
                                {medicalData.map((item)=> {
                                    return(
                                        <tr>
                                            <td scope="row">{moment(item.Date).format('LL')}</td>
                                            <td>{item.DoctorName}</td>                           
                                            <td>{item.PetName}</td>
                                            <td>{item.Subject}</td>
                                            <td><a href={item.Attachment} target='_blank'>{item.Attachment ? item.Attachment.split('/')[3] : 'None'}</a></td>
                                            <td style={item.Remarks ? {color: '#00b8d4', fontWeight:'bold', cursor:'pointer'} : null} onClick={item.Remarks ? ()=>toggleModalRemarks(item.Remarks) : null}>{item.Remarks ? "View Remarks" : "No Remarks"}</td>
                                            <td>
                                                <button className="btnEdit" onClick={()=> toggleEditModal(item.RecordID, item.Subject, item.Remarks, item.Attachment)}>Edit</button>
                                                <button className="btnCancel" onClick={()=> toggleDeleteModal(item.RecordID)}>Delete</button>
                                            </td>                       
                                        </tr>
                                    )
                                })}                   
                            </table>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                <button onClick={toggleModalMedicalRecords} className='btnCancel'><IoIcons.IoReturnUpBackOutline/> Back</button>
                </ModalFooter>
            </Modal>
            {/** OWNER MODAL */}
            <Modal centered backdrop="static" size="xl" isOpen={ownerModal}>
                <ModalBody>   
                        <h2>{firstname}'s Pet List</h2>
                    <div className="containerTable">             
                        <div className="tableWrapper">
                            <table>
                                <tr>
                                    <th>Name</th>   
                                    <th>Breed</th>                          
                                    <th>Gender</th>
                                    <th>Age</th>
                                    <th>Action</th>
                                </tr>
                                <h5 className='info' hidden={message == ""}>{message}</h5>
                                {specificOwnerData.map((item)=> {
                                    return(
                                        <tr>
                                            <td>{item.Name}</td>
                                            <td>{item.Breed}</td>
                                            <td>{item.Gender}</td>
                                            <td>{item.Age}</td>                                
                                            <td>
                                                <button className="btnMessage" onClick={()=> getMedicalRecords(item.PetID)}>View</button>
                                                <button className="btnView" onClick={()=> toggleAddMedicalRecord(item.PetID)}>Add Medical Record</button>
                                            </td>
                                        </tr>
                                    )
                                })} 
                            </table>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btnCancel" onClick={handleOk}>Close</button>
                </ModalFooter>
            </Modal>
            {/** EDIT MEDICAL RECORD MODAL */}
            <Modal centered backdrop="static" size="md" isOpen={editModal}>
                <ModalHeader>
                    Edit Medical Record
                </ModalHeader>
                <ModalBody>   
                    <TextField
                        error={error == 1 && subject == ''}
                        label='Subject'
                        variant='outlined'
                        value={subject}
                        style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                        onChange={e=> setSubject(e.target.value)}
                    />
                    <br/>
                    <TextField
                        error={error == 1 && remarks == ''}
                        label='Remarks'
                        multiline
                        rows={4}
                        value={remarks}
                        variant='outlined'
                        style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                        onChange={e=> setRemarks(e.target.value)}
                    />
                    <br/>
                    <div style={{display: 'flex', justifyContent:'center'}}>
                    <Input 
                        type='file'
                        label='attachment'
                        title={attachment}
                        files={attachment}
                        style={{width:'90%'}}
                        onChange={e=> setAttachment(e.target.files[0])}
                    />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <CircularProgress hidden={isLoading}/>
                    <button hidden={!isLoading} className="btnCancel" onClick={toggleEditModal}><IoIcons.IoReturnUpBackOutline/> Back</button>
                    <button hidden={!isLoading} className="btnAdd" onClick={handleEdit}>Edit</button>
                </ModalFooter>
            </Modal>
            {/** ADD MEDICAL RECORD MODAL */}
            <Modal centered backdrop="static" size="md" isOpen={modalAddMedicalRecord}>
                <ModalHeader>
                    Add Medical Record
                </ModalHeader>
                <ModalBody>   
                    <TextField
                        error={error == 1 && subject == ''}
                        label='Subject'
                        variant='outlined'
                        style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                        onChange={e=> setSubject(e.target.value)}
                    />
                    <br/>
                    <TextField
                        error={error == 1 && remarks == ''}
                        label='Remarks'
                        multiline
                        rows={4}
                        variant='outlined'
                        style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                        onChange={e=> setRemarks(e.target.value)}
                    />
                    <br/>
                    <div style={{display: 'flex', justifyContent:'center'}}>
                    <Input 
                        type='file'
                        style={{width:'90%'}}
                        onChange={e=> setAttachment(e.target.files[0])}
                    />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <CircularProgress hidden={isLoading}/>
                    <button hidden={!isLoading} className="btnCancel" onClick={toggleAddMedicalRecord}><IoIcons.IoReturnUpBackOutline/> Back</button>
                    <button hidden={!isLoading} className="btnAdd" onClick={addMedicalRecord}>Add</button>
                </ModalFooter>
            </Modal>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
            <div className='h2-wrapper'>  
                    <h2>Pet Owners   <input
                        className='searchPatient'
                        placeholder='Search'
                        onChange={e=> setSearch(e.target.value)}
                    ></input></h2>
            </div>
            <div className="containerTable">             
                <div className="tableWrapper">
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Picture</th>
                            <th>Action</th>
                        </tr>
                        <h5 className='info' hidden={message==""}>{message}</h5>
                        {petOwnerData.filter((val)=> {
                            if(search == ""){
                                return val
                            }
                            else if(val.FirstName.toLowerCase().includes(search.toLowerCase())){
                                return val
                            }
                        }).map((item)=> {
                            return(
                                <tr>
                                <td>{item.FirstName + ' ' + item.LastName}</td>
                                <td>
                                    <a href={item.ProfilePicture} target='_blank'><img className='tableImg' src={item.ProfilePicture ? item.ProfilePicture : Profile}/></a>
                                </td>
                                <td>
                                    <button onClick={()=>getSpecificOwner(item.OwnerID, item.FirstName)} className="btnView">View Pets</button>
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

export default Patients
