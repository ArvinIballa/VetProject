import React, {useState, useEffect} from 'react'
import { Container } from 'reactstrap'
import AdminNavbar from './Navbar'
import * as IoIcons from 'react-icons/io5'
import api from '../../api/api'
import Moment from 'moment'
import Profile from '../../images/profile.png'
import { Skeleton, LinearProgress, CircularProgress, TextField, FormControl, InputLabel, Select } from '@mui/material'

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
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [modalMedicalRecords, setModalMedicalRecords] = useState(false)
    const [medicalData, setMedicalData] = useState([])
    const [loadingModal, setLoadingModal] = useState(false)
    const [modalRemarks, setModalRemarks] = useState(false)
    const [remarkMessage, setRemarkMessage] = useState('')
    const [owner_id, setOwnerID] = useState('')
    const [pet_id, setPetID] = useState('')
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [breed, setBreed] = useState('')
    const [age, setAge] = useState('')
    const [prev_vacc, setPrevVacc] = useState('')
 
    const [successModal, setSuccessModal] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [deleteModal, setDeleteModal] = useState(false)
    const [deletePetModal, setDeletePetModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [errorModal, setErrorModal] = useState(false)
    const [ownerModal, setOwnerModal] = useState(false)
    const [petEditModal, setPetEditModal] = useState(false)

    const resetState = () => {
        setName('')
        setBreed('')
        setAge('')
        setGender('')
        setPrevVacc('')
    }

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

    const toggleModalRemarks = (remarks) => {
        setModalRemarks(!modalRemarks)
        setRemarkMessage(remarks)
    }

    const toggleCloseModal = () => {
        setPetEditModal(false)
        setOwnerModal(true)
    }

    const toggleCancelDeletePet = () => {
        setDeletePetModal(false)
        setOwnerModal(true)
    }

    const closeModal = () => {
        setDeleteModal(false)
        setSuccessModal(false)
        setPetEditModal(false)
    }

    const openDeleteModal = (owner_id) => {
        setDeleteModal(true)
        setOwnerID(owner_id)
    }

    const openModalDeletePet = (pet_id) => {
        setOwnerModal(false)
        setDeletePetModal(true)
        setLoadingModal(false)
        setPetID(pet_id)
    }

    const openModalEditPet = (pet_id, name, breed, age, gender, prev_vacc) => {
        setPetID(pet_id)
        setName(name)
        setBreed(breed)
        setAge(age)
        setGender(gender)
        setPrevVacc(prev_vacc)
        setPetEditModal(true)
        setOwnerModal(false)
        toggleLoadingModal()
    }   

    const handleOk = () => {
        setOwnerModal(false)
        setMessage('')
        setSpecificOwnerData([])
        setLoadingModal(false)
        setModalRemarks(false)
    }

    const handleDeletePet = () => {
        setIsLoading(false)
        api.delete(`Pets/delete_pet/${pet_id}`, {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.message){
                setSuccessModal(true)
                setSuccessMessage(res.message)
                setIsLoading(true)
                setDeletePetModal(false)
                setPetID('')
                
            }
        })
        .catch(err => {
            console.log(err.response)
            setErrorMessage(err.response.data)
            setErrorModal(true)
        })
    }

    const handleDelete = () => {
        setIsLoading(false)
        api.delete(`Owners/delete_owner/${owner_id}`, {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.message){
                setSuccessModal(true)
                setSuccessMessage(res.message)
                setIsLoading(true)
                setDeleteModal(false)
                setOwnerID('')
                getPetOwners()
            }
        })
        .catch(err => {
            console.log(err.response)
            setErrorMessage(err.response.data)
            setErrorModal(true)
        })
    }

    const handleEdit = () => {
        setIsLoading(false)
        const PetPayload = {
            pet_name: name,
            breed,
            age,
            gender,
            prev_vacc
        }
        api.post(`Pets/update/${pet_id}`, PetPayload, {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.message)
            setSuccessMessage(res.message)
            setSuccessModal(true)
            setIsLoading(true)
            setPetEditModal(false)
            setIsLoading(true)
            resetState()
        })

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
                setLoadingModal(false)
            }
            else{
                toggleOwnerModal()
                setMessage(res.message)
                setLoadingModal(false)
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
                setMedicalData(res.body)
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
            {/** SUCCESS MODAL */}
            <Modal centered backdrop="static" size="md" isOpen={successModal}>
                <ModalHeader>
                    Success!
                </ModalHeader>
                <ModalBody>
                    {successMessage}
                </ModalBody>
                <ModalFooter>
                <button className="btnAdd" onClick={closeModal}>OK</button>
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
                    Are you sure you want to delete this?
                </ModalBody>
                <ModalFooter>
                    <CircularProgress hidden={isLoading} />
                    <button hidden={!isLoading} className="btnView" onClick={closeModal}>Cancel</button>
                    <button hidden={!isLoading} className="btnCancel" onClick={handleDelete}>Delete</button>
                </ModalFooter>
            </Modal>
            {/** DELETE PET MODAL */}
            <Modal centered backdrop="static" size="md" isOpen={deletePetModal}>
                <ModalHeader>
                    Notice!
                </ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this?
                </ModalBody>
                <ModalFooter>
                    <CircularProgress hidden={isLoading} />
                    <button hidden={!isLoading} className="btnView" onClick={toggleCancelDeletePet}>Cancel</button>
                    <button hidden={!isLoading} className="btnCancel" onClick={handleDeletePet}>Delete</button>
                </ModalFooter>
            </Modal>
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
             {/** REMARKS MODAL */}
             <Modal centered backdrop="static" size="md" isOpen={modalRemarks}>
                <ModalHeader>
                    Remarks
                </ModalHeader>
                <ModalBody>
                    {remarkMessage}
                </ModalBody>
                <ModalFooter>
                    <button className='btnAdd' onClick={handleOk}>Ok</button>
                </ModalFooter>
            </Modal>
            {/** MODAL EDIT PETS */}
            <Modal centered backdrop="static" size="md" isOpen={petEditModal}>
                <ModalHeader>
                    <h2>Edit Pet</h2>
                </ModalHeader>
            <ModalBody>
                    <div>
                        <TextField
                            label='Name'
                            value={name}
                            variant='outlined'
                            style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                            onChange={e=> setName(e.target.value)}
                        />
                        <br/>
                        <TextField
                            label='Breed'
                            value={breed}
                            variant='outlined'
                            style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                            onChange={e=> setBreed(e.target.value)}
                        />
                        <br/>
                        <FormControl variant="outlined" style={{width: '100%', height: '10%'}}>
                            <InputLabel style={{marginLeft: '30px'}} >Gender</InputLabel>
                            <Select
                                native
                                value={gender}
                                style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                                label="Verify Status"
                                onChange={e=> setGender(e.target.value)}
                            >
                            <option selected disabled>Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
        
                            </Select>
                        </FormControl>
                        <br/><br/>
                        <TextField
                            label='Age'
                            value={age}
                            variant='outlined'
                            style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                            onChange={e=> setAge(e.target.value)}
                        />
                        <br/>
                        <TextField
                            label='Previous Vaccine'
                            variant='outlined'
                            value={prev_vacc}
                            style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                            onChange={e=> setPrevVacc(e.target.value)}
                        />
                        <br/>                      
                    </div>
                </ModalBody>
                <ModalFooter>
                    <CircularProgress hidden={isLoading}/>
                    <button hidden={!isLoading} onClick={toggleCloseModal} className='btnCancel'><IoIcons.IoReturnUpBackOutline style={{fontSize:'20px'}}/> BACK</button>
                    <button hidden={!isLoading} onClick={handleEdit} className='btnEdit'>EDIT</button>
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
                                                <button className="btnView" onClick={()=>getMedicalRecords(item.PetID)}>View Medical Records</button>
                                                <button className='btnEdit' onClick={()=> openModalEditPet(item.PetID, item.Name, item.Breed, item.Age, item.Gender, item.PreviousVaccinations)}>Edit</button>
                                                <button className='btnCancel' onClick={()=> openModalDeletePet(item.PetID)}>Delete</button>
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
            <Modal centered backdrop='static' size='xl' isOpen={modalMedicalRecords}>
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
                                    
                                    </tr>
                                    {medicalData.map((item)=> {
                                        return(
                                            <tr>
                                                <td scope="row">{item.Date}</td>
                                                <td>{item.DoctorName}</td>                           
                                                <td>{item.PetName}</td>
                                                <td>{item.Subject}</td>
                                                <td><a href={item.Attachment} target='_blank'>{item.Attachment ? item.Attachment.split('/')[3] : 'None'}</a></td>
                                                <td style={item.Remarks ? {color: '#00b8d4', fontWeight:'bold', cursor:'pointer'} : null} onClick={item.Remarks ? ()=>toggleModalRemarks(item.Remarks) : null}>{item.Remarks ? "View Remarks" : "No Remarks"}</td>
                                                
                                            </tr>
                                        )
                                    })}                   
                                </table>
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
                                        <td style={{textTransform:'none'}}>{item.EmailAddress}</td>                                
                                        <td>
                                            <button hidden={!isLoading} className="btnView" onClick={()=>getSpecificOwner(item.OwnerID, item.FirstName)}>View Pet</button>
                                            <button className='btnCancel' onClick={()=>openDeleteModal(item.OwnerID)}>Delete</button>
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
