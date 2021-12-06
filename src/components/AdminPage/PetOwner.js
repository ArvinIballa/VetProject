import React, {useState, useEffect} from 'react'
import { Container } from 'reactstrap'
import AdminNavbar from './Navbar'
import api from '../../api/api'
import Moment from 'moment'
import Profile from '../../images/profile.png'

const PetOwner = () => {

    const getToken = sessionStorage.getItem('token')

    const [ownerData, setOwnerData] = useState([])

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

    const getMedicalRecords = (pet_id) => {
        const medicalPayload = {
            pet_id
        }
        api.get('MedRecords/list', medicalPayload ,{headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
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
            <div className='h2-wrapper'>  
                        <h2>Pet Owners<input
                            className='searchPatient'
                            placeholder='Search'
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
                            {ownerData.map((item)=> {
                                return(
                                    <tr>
                                        <td>{item.FirstName + ' ' + item.LastName}</td>
                                        <td>
                                            <a href={item.ProfilePicture} target='_blank'><img className='tableImg' src={item.ProfilePicture ? item.ProfilePicture : Profile}/></a>
                                        </td>
                                        <td>{item.ContactNumber}</td>
                                        <td>{item.EmailAddress}</td>                                
                                        <td>
                                            <button className="btnView" onClick={()=>getMedicalRecords(item.PetID)}>Pet Records</button>
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
