import React, {useState} from 'react'
import './MyPets.css'
import Container from '@mui/material/Container';
import * as FaIcons from 'react-icons/fa'
import Cat from '../../images/cat.png'
import Dog from '../../images/dog.png'
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
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
import './Consult.css'


const Consult = () => {
    
    const [modalConsult, setModalConsult] = useState(false)

    const toggleModalConsult = () => {
        setModalConsult(!modalConsult)
    }

    return (
        <>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
            <Modal centered backdrop='static' size='lg' isOpen={modalConsult}>
                <ModalHeader>
                    Book A Consultation
                </ModalHeader>
                <ModalBody>
                <TextField
                    label="Search"
                    variant='filled'
                    id="filled-start-adornment"
                    style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><FaIcons.FaSearch/></InputAdornment>,
                    }}
                    variant="outlined"
                />
                </ModalBody>
                <ModalFooter>
                    <button onClick={toggleModalConsult} className='btnClose'>Close</button>
                </ModalFooter>
            </Modal>
            <Container fixed>      
                <br/>
                <h2>Consultation Records <button onClick={toggleModalConsult} className="btnBook">Book a Consultation</button> </h2>
                    <table className="content-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Doctor</th>
                                <th>Pet</th>
                                <th>Concern</th>
                                <th>Meet Link</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Jan 01, 2021</td>
                                <td>Dr. Pedro</td>
                                <td>Dog</td>
                                <td>Vaccine</td>
                                <td><a target='_blank' href={'https://meet.google.com/?pli=1'}>https://meet.google.com/?pli=1</a></td>
                                <td>Ongoing</td>
                                <td>
                                    <button className='btnView'>Settle Balance</button>
                                    <button className='btnCancel'>Cancel</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </Container>
        </>
    )
}

export default Consult
