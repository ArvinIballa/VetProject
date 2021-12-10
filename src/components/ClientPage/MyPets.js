import React, { useState, useEffect} from 'react'
import './MyPets.css'
import ClientNavbar from './Navbar'
import Container from '@mui/material/Container';
import Cat from '../../images/cat.png'
import Dog from '../../images/dog.png'
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

import Backdrop from '@mui/material/Backdrop'
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { CircularProgress, Skeleton, LinearProgress } from '@mui/material';

import {
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
} from 'reactstrap'
import api from '../../api/api';

const MyPets = () => {

    const getToken = sessionStorage.getItem('token')

    const [modalAddPet, setModalAddPet] = useState(false)
    const [modalMedicalRecords, setModalMedicalRecords] = useState(false)

    const toggleModalMedicalRecords = () => {
        setModalMedicalRecords(!modalMedicalRecords)
        setLoadingModal(false)
    }

    const toggleModalAddPet = () => {
        setModalAddPet(!modalAddPet)
    }

    const toggleErrorModal = () => {
        setErrorModal(!errorModal)
        
    }

    const resetState = () => {
        setPetName()
        setBreed()
        setAge()
        setGender()
        setPrevVacc()
    }

    const handleOk = () => {
        setSuccessModal(false)
        setModalAddPet(false)
        setLoadingModal(false)
        setModalRemarks(false)
    }

    const [pet_name, setPetName] = useState('')
    const [breed, setBreed] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [prev_vacc, setPrevVacc] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [MyPetsData, setMyPetsData] = useState([])
    const [medicalData, setMedicalData] = useState([])

    const [errorModal, setErrorModal] = useState(false)
    const [successModal, setSuccessModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [loadingModal, setLoadingModal] = useState(false)
    const [modalRemarks, setModalRemarks] = useState(false)
    const [remarkMessage, setRemarkMessage] = useState('')

    const toggleLoadingModal = () => {
        setLoadingModal(!loadingModal)
    }


    const getMyPets = () => {
        api.get('Pets/list', {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.body){
                setMyPetsData(res.body)
            }
            else{
                return null
            }
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    const toggleModalRemarks = (remarks) => {
        setModalRemarks(!modalRemarks)
        setRemarkMessage(remarks)
    }

    const handleAddPet = () => {
        setIsLoading(false)
        const AddPetPayload = {
            pet_name,
            breed,
            age,
            gender,
            prev_vacc
        }
        api.post('Pets', AddPetPayload, {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.message){
                setSuccessMessage(res.message)
                setSuccessModal(true)
                setIsLoading(true)
                getMyPets()
                resetState()
            }
            else{
                setErrorMessage('error')
                setErrorModal(true)
                setIsLoading(true)
            }
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    const getMedicalRecords = (pet_id) => {
        toggleLoadingModal()
        const medicalPayload = {
            pet_id
        }
        api.post('MedRecords/list', medicalPayload ,{headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            setLoadingModal(false)
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
        getMyPets()
    }, [])
    return (
        <>  
        <ClientNavbar/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
            <br/>
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
            {/** MODAL ADD PETS */}
            <Modal centered backdrop="static" size="md" isOpen={modalAddPet}>
                <ModalHeader>
                    <h2>Add Pet</h2>
                </ModalHeader>
            <ModalBody>
                    <div>
                        <TextField
                            label='Name'
                            variant='outlined'
                            style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                            onChange={e=> setPetName(e.target.value)}
                        />
                        <br/>
                        <TextField
                            label='Breed'
                            variant='outlined'
                            style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                            onChange={e=> setBreed(e.target.value)}
                        />
                        <br/>
                        <FormControl variant="outlined" style={{width: '100%', height: '10%'}}>
                            <InputLabel style={{marginLeft: '30px'}} >Gender</InputLabel>
                            <Select
                                native
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
                            variant='outlined'
                            style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                            onChange={e=> setAge(e.target.value)}
                        />
                        <br/>
                        <TextField
                            label='Previous Vaccine'
                            variant='outlined'
                            style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                            onChange={e=> setPrevVacc(e.target.value)}
                        />
                        <br/>                      
                    </div>
                </ModalBody>
                <ModalFooter>
                    <CircularProgress hidden={isLoading}/>
                    <button hidden={!isLoading} onClick={toggleModalAddPet} className='btnClose'>CLOSE</button>
                    <button hidden={!isLoading} onClick={handleAddPet} className='btnAddModal'>ADD</button>
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
            <Container>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
            <div className='h2-wrapper'>  
            <h2>My Pets<button className="btnAdd" onClick={toggleModalAddPet}>+ ADD</button> </h2>
            </div>
            <div className="containerTable">             
                <div className="tableWrapper">
                    <table>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Breed</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Age</th>
                            <th scope="col">Action</th>
                        </tr>
                        {MyPetsData.map((item)=> {
                            return(
                                <tr>
                                    <td scope="row">{item.Name}</td>
                                    <td>{item.Breed}</td>                           
                                    <td>{item.Gender}</td>
                                    <td>{item.Age}</td>
                                    <td>
                                        <button onClick={()=> getMedicalRecords(item.PetID)} className="btnView">View Medical Records</button>
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

export default MyPets
