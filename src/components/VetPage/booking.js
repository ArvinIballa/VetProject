import React, { useEffect, useState } from 'react'
import VetNavbar from './Navbar'
import { Container } from '@mui/material'
import './booking.css'
import api from '../../api/api'
const Booking = () => {

    const getToken = sessionStorage.getItem('token')

    const [consultData, setConsultData] = useState([])
    const [message, setMessage] = useState('')

    const getBookings = () => {
        api.get('Consultations/list', {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.body){
                setConsultData(res.body)
            }
            else{
                setMessage(res.message)
            }
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    useEffect(() => {
        getBookings()
    }, [])

    return (
        <>
            <VetNavbar/> 
            <Container>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
                <div className='h2-wrapper'>  
                        <h2>Bookings   <input
                            className='searchPatient'
                            placeholder='Search'
                        ></input></h2>
                </div>
                <div className="containerTable">             
                    <div className="tableWrapper">
                        <table>
                            <tr>
                                <th>Date & Time</th>
                                <th>Pet</th>
                                <th>Concern</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            <h5 className='info'>{message}</h5>
                            {consultData.map((item)=> {
                                return (
                                    <tr>
                                    <td>Arvin</td>
                                    <td>Dog</td>
                                    <td>Vaccination</td>
                                    <td style={{fontWeight:'bold', color:'green'}}>
                                        Done
                                    </td>
                                    <td>
                                        <button className="btnView">Confirm</button>
                                        <button className="btnView">Mark as Done</button>
                                        <button className="btnMessage">Message Client</button>
                                        <button className="btnCancel">Cancel</button>
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

export default Booking
