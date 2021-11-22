import React, {useState} from 'react'
import './MyPets.css'
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

import {
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
} from 'reactstrap'

const MyPets = () => {
    const [modalAddPet, setModalAddPet] = useState(false)
    const [modalMedicalRecords, setModalMedicalRecords] = useState(false)

    const toggleModalMedicalRecords = () => {
        setModalMedicalRecords(!modalMedicalRecords)
    }

    const toggleModalAddPet = () => {
        setModalAddPet(!modalAddPet)
    }
    return (
        <>  
         <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
            <br/>
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
                        />
                        <br/>
                        <FormControl variant="outlined" style={{width: '100%', height: '10%'}}>
                            <InputLabel style={{marginLeft: '30px'}} >Type</InputLabel>
                            <Select
                                native
                                style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                                label="Verify Status"
                            >
                            <option selected disabled>Select</option>
                            <option>Cat</option>
                            <option>Dog</option>
        
                            </Select>
                        </FormControl>
                        <br/>
                        <label style={{margin:'10px 20px'}}>Picture</label>
                        <br/>
                        <input style={{marginLeft:'20px'}} type='file'></input>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button onClick={toggleModalAddPet} className='btnClose'>CLOSE</button>
                    <button className='btnAddModal'>ADD</button>
                </ModalFooter>
            </Modal>
            {/** MODAL VIEW MEDICAL RESULTS */}
            <Modal centered backdrop='static' size='md' isOpen={modalMedicalRecords}>
                <ModalHeader>
                    <h2>Medical Records</h2>
                </ModalHeader>
                <ModalBody>
                <div>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
                        label='Person'
                        variant='outlined'
                        style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                    />
                    <br/>
                    <TextField
                        InputLabelProps={{
                        shrink: true,
                        }}
                        disabled
                        label='Subject'
                        variant='outlined'
                        style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                    />
                    <br/>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
                        multiline
                        rows={3}
                        label='Remarks'
                        variant='outlined'
                        style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                    />
                    <br/>
                    <label style={{marginLeft: '20px'}}>Attachment:</label>&nbsp;
                    <a href={Cat} target='_blank' download><label className='link'>Cat.png</label></a>
                </div>
                </ModalBody>
                <ModalFooter>
                <button onClick={toggleModalMedicalRecords} className='btnClose'>CLOSE</button>
                </ModalFooter>
            </Modal>
                <Container fixed>
                    
                <br/>
                <h2>My Pets<button className="btnAdd" onClick={toggleModalAddPet}>+ ADD</button> </h2>
                
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Picture</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Arvin</td>
                            <td>Canine Dog</td>
                            <td>
                                <img className='tableImg' src={Dog} width='auto' height='auto'></img>
                            </td>
                            <td>
                                <button onClick={toggleModalMedicalRecords} className="btnView">View Medical Records</button>
                                
                            </td>
                        </tr>
                        <tr>
                            <td>Elle</td>
                            <td>Cat</td>
                            <td>
                            <img className='tableImg' src={Cat} width='auto' height='auto'></img>
                            </td>
                            <td>
                            <button className="btnView">View Medical Records</button>
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
                </Container>
        </>
    )
}

export default MyPets
