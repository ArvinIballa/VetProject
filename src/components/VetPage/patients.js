import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import VetNavbar from './Navbar'
import './patients.css'
import api from '../../api/api'
const Patients = () => {

    const getToken = sessionStorage.getItem('token')
    const getID = sessionStorage.getItem('ID')

    const [message, setMessage] = useState('')
    const [petOwnerData, setPetOwnerData] = useState([])
    const getPetOwner = () => {
        api.get(`Consultations/owners_per_doctor/${getID}`, {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
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

    useEffect(() => {
        getPetOwner()
    }, [])
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
                        <h5 className='info'>{message}</h5>
                        {petOwnerData.map((item)=> {
                            return(
                                <tr>
                                <td>{item.PetOwner}</td>
                                <td>{item.PetName}</td>
                                <td>
                                    <button className="btnView">View Medical Records</button>
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
