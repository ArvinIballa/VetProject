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

    
    
    const openModalAddPet = () => {
        setModalAddPet(!modalAddPet)
    }
    return (
        <>  
            <Modal centered backdrop="static" size="md" isOpen={modalAddPet}>
                <ModalBody>
                    <div>
                        <h2>Add Pet</h2>
                        <TextField
                             label='Name'
                             variant='outlined'
                             style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                        />
                        <br/>
                        <FormControl variant="outlined" style={{width: '100%', height: '10%'}}>
                            <InputLabel style={{marginLeft: '25px'}} >Type</InputLabel>
                            <Select
                                native
                                style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                                label="Verify Status"
                            >
                            <option selected disabled>Select</option>
        
                            </Select>
                        </FormControl>
                        <br/>
                        <label style={{margin:'10px 20px'}}>Picture</label>
                        <br/>
                        <input style={{marginLeft:'20px'}} type='file'></input>
                       
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button>CLOSE</button>
                    <button>ADD</button>
                </ModalFooter>
            </Modal>

                <Container fixed>
                    
                <br/>
                <h2>My Pets <button className="btnAdd" onClick={openModalAddPet}>+ ADD</button> </h2>
                
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
                                <button className="btnView">View Medical Records</button>
                                
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
