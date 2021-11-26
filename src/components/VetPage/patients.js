import React from 'react'
import { Container } from '@mui/material'
import VetNavbar from './Navbar'
import './patients.css'
const patients = () => {
    return (
        <>
            <VetNavbar/>  
            <Container>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
            <div className='h2-wrapper'>  
                    <h2>Pet Owners   <input
                        className='searchPatient'
                        placeholder='Search'
                    ></input></h2>
            </div>
            <div className="containerTable">             
                <div className="tableWrapper">
                    <table>
                        <tr>
                            <th>Pet Owner</th>
                            <th>Pet Name</th>
                            <th>Action</th>
                        </tr>
                        <tr>
                            <td>Arvin</td>
                            <td>Luna</td>
                            <td>
                                <button className="btnView">View Medical Records</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            </Container>
        </>
    )
}

export default patients
