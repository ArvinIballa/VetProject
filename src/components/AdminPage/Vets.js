import React, {useState, useEffect} from 'react'
import { Container } from 'reactstrap'
import AdminNavbar from './Navbar'
import api from '../../api/api'
import Moment from 'moment'
import Profile from '../../images/profile.png'

const Vets = () => {

    const getToken = sessionStorage.getItem('token')

    const [vetData, setVetData] = useState([])

    const getVets = () => {
        api.get('Vets/list', {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.body){
                setVetData(res.body)
            }
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    useEffect(() => {
        getVets()
    }, [])

    return (
        <>
            <AdminNavbar/>
            <Container>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
            <div className='h2-wrapper'>  
                        <h2>Veterinarians<input
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
                            </tr>
                            {vetData.map((item)=> {
                                return(
                                    <tr>
                                        <td>{item.FirstName + ' ' + item.LastName}</td>
                                        <td>
                                            <a href={item.ProfilePicture} target='_blank'><img className='tableImg' src={item.ProfilePicture ? item.ProfilePicture : Profile}/></a>
                                        </td>
                                        <td>{item.ContactNumber}</td>
                                        <td>{item.EmailAddress}</td>                                
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

export default Vets
