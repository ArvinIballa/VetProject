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

const Patients = () => {

    const getToken = sessionStorage.getItem('token')
    const getID = sessionStorage.getItem('ID')
    const [ownerModal, setOwnerModal] = useState('')
    const [specificOwnerData, setSpecificOwnerData] = useState([])
    const [message, setMessage] = useState('')
    const [search, setSearch] = useState('')
    const [petOwnerData, setPetOwnerData] = useState([])
    const [modalAddMedicalRecord, setModalAddMedicalRecord] = useState(false)
    const [petID, setPetID] = useState('')
    const [subject, setSubject] = useState('')
    const [remarks, setRemarks] = useState('')
    const [error, setError] = useState(1)
    const [errorModal, setErrorModal] = useState(false)
    const [successModal, setSuccessModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [attachment, setAttachment] = useState('')

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

    const addMedicalRecord = () => {
        setIsLoading(false)
        let formdata = new FormData()
        formdata.append('pet', petID)
        formdata.append('subject', subject)
        formdata.append('remarks', remarks)
        formdata.append('attachment', attachment ? attachment : null)
        
        if(subject == "" || remarks == ""){
            setErrorModal(true)
            setErrorMessage('All fields are required')
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
                                    <img className='tableImg' src={item.ProfilePicture ? item.ProfilePicture : Profile}/>
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
