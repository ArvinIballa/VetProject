import React, {useState, useEffect} from 'react'
import { Container } from 'reactstrap'
import AdminNavbar from './Navbar'
import api from '../../api/api'
import Moment from 'moment'
import Profile from '../../images/profile.png'
import { Skeleton, LinearProgress } from '@mui/material'

import {
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Input
} from 'reactstrap'

const PetOwner = () => {

    

    const getToken = sessionStorage.getItem('token')

    const [ownerData, setOwnerData] = useState([])
    const [specificOwnerData, setSpecificOwnerData] = useState([])
    const [message, setMessage] = useState('')
    const [ownerModal, setOwnerModal] = useState('')
    const [errorMessage, setErrorMessage] = useState("")
    const [errorModal, setErrorModal] = useState(false)
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [modalMedicalRecords, setModalMedicalRecords] = useState(false)
    const [medicalData, setMedicalData] = useState([])
    const [loadingModal, setLoadingModal] = useState(false)

    const toggleOwnerModal = () => {
        setOwnerModal(!ownerModal)
        
    }

    const toggleLoadingModal = () => {
        setLoadingModal(!loadingModal)
    }

    const toggleModalMedicalRecords = () => {
        setModalMedicalRecords(!modalMedicalRecords)
    }

    const toggleErrorModal = () => {
        setErrorModal(!errorModal)
        
    }

    const handleOk = () => {
        setOwnerModal(false)
        setMessage('')
        setSpecificOwnerData([])
        toggleLoadingModal()
    }

    const getPetOwners = () => {
        api.get('Owners/list', {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.body){
                setOwnerData(res.body)
            }
        })
        .catch(err => {
            console.log(err.response)
        })
    }
    const [firstname, setFirstName] = useState('')
    const getSpecificOwner = (owner_id, firstname) => {
        toggleLoadingModal()
        console.log(owner_id)
        setFirstName(firstname)
        api.get(`Pets/list_pet_owner/${owner_id}`, {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.body){
                setSpecificOwnerData(res.body)
                toggleOwnerModal()
                toggleLoadingModal()
            }
            else{
                toggleOwnerModal()
                setMessage(res.message)
                toggleLoadingModal()
            }
        })
        .catch(err => {
            console.log(err.response)
        })
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
                setMedicalData(res.body[0])
            }
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    useEffect(() => {
        getPetOwners()
    }, [])

    return (
        <>
            <AdminNavbar/>
            <Container>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
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
             {/** LOADING MODAL */}
            <Modal centered backdrop="static" size="md" isOpen={loadingModal}>
                <ModalHeader>
                    Loading
                </ModalHeader>
                <ModalBody>
                    <div style={{justifyContent: 'center', alignItems:'center'}}>
                    <LinearProgress />
                    </div>
                </ModalBody>
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
                                                <button className="btnView" onClick={()=>getMedicalRecords(item.PetID)}>View Medical Records</button>
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
            {/** MODAL VIEW MEDICAL RESULTS */}
            <Modal centered backdrop='static' size='md' isOpen={modalMedicalRecords}>
                <ModalHeader>
                    <h2>Medical Records</h2>
                </ModalHeader>
                <ModalBody>
                <div className="row">
                    <div className = "col-md-6">
                        <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                        <label hidden={!isLoading} className="labelTitle">Subject</label>
                    </div>
                    <div className = "col-md-6">
                        <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                        <label hidden={!isLoading} className="labelContext">{medicalData.Subject}</label>
                    </div>
                </div>
                <div className="row">
                    <div className = "col-md-6">
                        <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                        <label hidden={!isLoading} className="labelTitle">Date</label>
                    </div>
                    <div className = "col-md-6">
                        <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                        <label hidden={!isLoading} className="labelContext">{medicalData.Date}</label>
                    </div>
                </div>
                <div className="row">
                    <div className = "col-md-6">
                        <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                        <label hidden={!isLoading} className="labelTitle">Doctor's Name</label>
                    </div>
                    <div className = "col-md-6">
                        <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                        <label hidden={!isLoading} className="labelContext">{medicalData.DoctorName}</label>
                    </div>
                </div>
                <div className="row">
                    <div className = "col-md-6">
                        <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                        <label hidden={!isLoading} className="labelTitle">Pet's Name</label>
                    </div>
                    <div className = "col-md-6">
                        <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                        <label hidden={!isLoading} className="labelContext">{medicalData.PetName}</label>
                    </div>
                </div>
                <div className="row">
                    <div className = "col-md-6">
                        <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                        <label hidden={!isLoading} className="labelTitle">Remarks</label>
                    </div>
                    <div className = "col-md-6">
                        <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                        <label hidden={!isLoading} className="labelContext">{medicalData.Remarks}</label>
                    </div>
                </div>
                </ModalBody>
                <ModalFooter>
                    <button onClick={toggleModalMedicalRecords} className='btnClose'>CLOSE</button>
                </ModalFooter>
            </Modal>
            <div className='h2-wrapper'>  
                        <h2>Pet Owners<input
                            className='searchPatient'
                            placeholder='Search Name'
                            onChange={e=> setSearch(e.target.value)}
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
                            {ownerData.filter((val)=>{
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
                                        <td>{item.ContactNumber}</td>
                                        <td>{item.EmailAddress}</td>                                
                                        <td>
                                            <button hidden={!isLoading} className="btnView" onClick={()=>getSpecificOwner(item.OwnerID, item.FirstName)}>View Pet</button>
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

export default PetOwner
