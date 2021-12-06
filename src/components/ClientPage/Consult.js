import React, {useState, useEffect} from 'react'
import ClientNavbar from './Navbar'
import './MyPets.css'
import Container from '@mui/material/Container';
import * as FaIcons from 'react-icons/fa'
import Cat from '../../images/cat.png'
import Dog from '../../images/dog.png'
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import Backdrop from '@mui/material/Backdrop'
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Profile from '../../images/profile.png'
import { Skeleton, CircularProgress } from '@mui/material'
import {
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Input
} from 'reactstrap'
import './Consult.css'
import api from '../../api/api'
import * as IoIcons from 'react-icons/io5'
import QR from '../../images/QR-Gcash.PNG'
import Moment from 'moment'


const Consult = () => {
    
    const getToken = sessionStorage.getItem('token')
    const [modalConsult, setModalConsult] = useState(false)
    const [modalViewProfile, setModalViewProfile] = useState(false)
    const [modalBook, setModalBook] = useState(false)
    const [message, setMessage] = useState('')
    const [search, setSearch] = useState('')
    const [vetData, setVetData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [profileData, setProfileData] = useState([])
    const [petData, setPetData] = useState([])
    const [availableDays, setAvailableDays] = useState('')
    const [time, setTime] = useState('')
    const [doctor_id, setDoctorID] = useState('')
    const [pet_id, setPetID] = useState('')
    const [date, setDate] = useState('')
    const [consultation_fee, setConsultationFee] = useState('')
    const [reservation_fee, setReservationFee] = useState('')
    const [reservation_reference, setReservationReference] = useState('')
    const [error, setError] = useState(0)
    const [consultData, setConsultData] = useState([])
    const [fullpayment_reference, setFullpaymentReference] = useState('')
    const [timeData, setTimeData] = useState([])
    const [invalidTime, setInvalidTime] = useState('')

    const [errorModal, setErrorModal] = useState(false)
    const [successModal, setSuccessModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [settleModal, setSettleModal] = useState(false)
    const [consultationID, setConsultationID] = useState('')

    const resetState = () => {
        setDoctorID('')
        setPetID('')
        setDate('')
        setTime('')
        setConsultationFee('')
        setReservationReference('')
        setReservationFee('')
        setError(0)
    }

    const handleOk = () => {
        setSuccessModal(false)
        setModalBook(false)
        setSettleModal(false)
    }

    const toggleErrorModal = () => {
        setErrorModal(!errorModal)
        
    }

    const toggleSettleModal = (id) => {
        setSettleModal(!settleModal)
        setConsultationID(id)
        
    }

    console.log(pet_id)

    const toggleModalConsult = () => {
        setModalConsult(!modalConsult)
    }

    const toggleModalViewProfile = () => {
        setModalViewProfile(!modalViewProfile)
        setModalConsult(!modalConsult)
    }

    const toggleModalBook = () => {
        setError(0)
        setModalBook(!modalBook)
        setModalViewProfile(!modalViewProfile)
        setDate("")
        setInvalidTime("")
    }

    const handleDate = (e) => {
        setDate("")
        setInvalidTime("")
        let selectedDate = e.target.value
        setDate(selectedDate)
        const datePayload = {
            date: selectedDate
        }
        console.log(selectedDate)
        api.post(`Consultations/get_available_time/${doctor_id}`, datePayload, {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.body){
                setTimeData(res.body)
            }
            else if(res.message){
                setInvalidTime('Fullybooked')
            }
            else
                return null
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    const handleViewProfile = (firstname) => {
        setIsLoading(false)
        setModalViewProfile(!modalViewProfile)
        setModalConsult(!modalConsult)

        api.get(`Vets/search/${firstname}`, {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.body){
                setProfileData(res.body)
                setAvailableDays(res.body[0].AvailableDays)
                setConsultationFee(res.body[0].ConsultationFee)
                setDoctorID(res.body[0].DoctorID)
                setIsLoading(true)
            }
            else 
                return null
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    const getPet = () => {
        api.get('Pets/list', {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.body){
                setPetData(res.body)
            }
            else    
                return null
        })
        .catch(err => {
            console.log(err)
        })
    }


    const getVets = () => {
        api.get('Vets/list', {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.body){
                setVetData(res.body)
            }
            else
                return null
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    const getConsult = () => {
        api.get('Consultations/list_owner', {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.body){
                setConsultData(res.body)
            }
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    const handleBook = () => {
        setIsLoading(false)
        let formdata = new FormData()
        formdata.append('doctor_id', doctor_id)
        formdata.append('date', date)
        formdata.append('time', time)
        formdata.append('consultation_fee', consultation_fee)
        formdata.append('reservation_fee', reservation_fee)
        formdata.append('pet_id', pet_id)
        formdata.append('reservation_reference', reservation_reference)    

        if(date == '' || time == '' || reservation_fee == '' || reservation_reference == ''){
            setErrorMessage('All fields are required!')
            setErrorModal(true)
            setIsLoading(true)
            setError(1)
            return false
        }

        else if(parseInt(consultation_fee) < parseInt(reservation_fee)){
            setErrorMessage('Reservation fee must not be greater than consulation fee!')
            setErrorModal(true)
            setIsLoading(true)
            setError(1)
            return false
        }

        else if(parseInt(reservation_fee) < 150){
            setErrorMessage('Reservation fee must not be less than 150 Pesos!')
            setErrorModal(true)
            setIsLoading(true)
            setError(1)
            return false
        }

        api.post('Consultations', formdata, {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.message){
                setSuccessMessage(res.message)
                setSuccessModal(true)
                setIsLoading(true)
                getConsult()
                resetState()
            }
            else{
                setErrorModal(true)
                setErrorMessage('Something went wrong. Please try again.')
                setIsLoading(true)
            }
        })
        .catch(err => {
            console.log(err.response)
            setErrorModal(true)
            setErrorMessage('Something went wrong. Please try again.')
            setIsLoading(true)
        })
    }

    const handleSettle = () => {
        setIsLoading(false)
        let formdata = new FormData()
        formdata.append('fullpayment_reference', fullpayment_reference)
        api.post(`Consultations/settle_balance/${consultationID}`, formdata, {headers: {Authorization: `Bearer ${getToken}`}})
        .then(res => {
            console.log(res)
            if(res.message){
                setSuccessMessage(res.message)
                setSuccessModal(true)
                setIsLoading(true)
                setFullpaymentReference('')
                getConsult()
            }
            else
                return null
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    useEffect(() => {
        getVets()
        getPet()
        getConsult()
    }, [])

    return (
        <>
        <ClientNavbar/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />

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

            {/** SETTLE PAYMENT MODAL */}
            <Modal centered backdrop="static" size="md" isOpen={settleModal}>
                <ModalHeader>
                    Settle your remaining balance
                </ModalHeader>
                <ModalBody>
                    <Input 
                        type='file'
                        onChange={e=> setFullpaymentReference(e.target.files[0])}
                    />
                </ModalBody>
                <ModalFooter>
                    <button className="btnCancel" onClick={handleOk}>Close</button>
                    <button className="btnAdd" onClick={handleSettle}>Send Payment</button>
                </ModalFooter>
            </Modal>
            
            <Modal centered backdrop='static' size='xl' isOpen={modalConsult}>
                <ModalHeader>
                    Book A Consultation
                </ModalHeader>
                <ModalBody>
                    <div>  
                        <h2>List of Vets   <input
                            className='searchPatient'
                            placeholder="Search Doctor's Name"
                            onChange={e=> setSearch(e.target.value)}
                        ></input></h2>
                    </div>
                    <br/>
                    <div className="containerTable">             
                        <div className="tableWrapper">
                            <table>
                                <tr>
                                    <th className='tableHead'>Doctor's Name</th>
                                    <th className='tableHead'>Picture</th>                                  
                                    <th className='tableHead'>Available Days</th>
                                    <th className='tableHead'>Contact Number</th>
                                    <th className='tableHead'>Email Address</th>
                                    <th className='tableHead'>Action</th>
                                </tr>
                                <h5 hidden={message ? false : true} className='info'>{message}</h5>
                                {vetData.filter((val)=>{
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
                                            <img className='tableImg' src={item.ProfilePicture ? item.ProfilePicture : Profile}/>
                                        </td>
                                        <td>{item.AvailableDays}</td>
                                        <td>{item.ContactNumber}</td>
                                        <td>{item.EmailAddress}</td>
                                        <td>
                                            <button onClick={()=>handleViewProfile(item.FirstName)} className="btnView">View Profile</button>
                                        </td>
                                    </tr>
                                    )
                                })}
                            </table>
                        </div>
                    </div>
                    <br/>
                </ModalBody>
                <ModalFooter>
                    <button onClick={toggleModalConsult} className='btnCancel'>Close</button>
                </ModalFooter>
            </Modal>
            {/** VIEW PROFILE */}
            <Modal centered backdrop='static' size='xl' isOpen={modalViewProfile}>
                <ModalHeader>
                    Profile
                </ModalHeader>
                {profileData.map((item)=> {
                    return(
                        <ModalBody>
                        <div className="container emp-profile">
                            <div className="row">
                                <div className="col-md-4">
                                <Skeleton hidden={isLoading} sx={{ height: 490, width: 350, borderRadius: 20 }} animation="wave" variant="rectangular" />
                                    <img hidden={!isLoading} className="profilePic" src={item.ProfilePicture ? item.ProfilePicture : Profile}/>
                                </div>
                                <div className="col-md-6">
                                    <div className='profile-head'>
                                    <Skeleton hidden={isLoading} animation="wave" height={10} width="40%" />
                                        <h5 hidden={!isLoading}>{item.FirstName} {item.LastName}</h5>
                                        <br hidden={isLoading}/>
                                    <Skeleton hidden={isLoading} animation="wave" height={10} width="15%" />  
                                        <h6 hidden ={!isLoading}>Veterinarian Doctor</h6>
                                        <div className="col -md-8 pl-5">
                                    <div className="tab-content profile-tab">
                                        <div className="tab-panel">
                                        <ul className="nav nav-tabs mt-5 mb-5" role="tablist">
                                            <li className="nav-item">
                                            <Skeleton hidden={isLoading} animation="wave" height={50} width="600%" />
                                                <a hidden={!isLoading} className="nav-link active" href="#">Profile</a>
                                            </li>
                                        </ul>
                                            <div className="row">
                                                <div className = "col-md-6">
                                                <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" /> 
                                                    <label hidden={!isLoading} className="labelTitle">First Name</label>
                                                </div>
                                                <div className = "col-md-6">
                                                <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                                                    <label hidden={!isLoading} className="labelContext">{item.FirstName}</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className = "col-md-6">
                                                <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                                                    <label hidden={!isLoading} className="labelTitle">Last Name</label>
                                                </div>
                                                <div className = "col-md-6">
                                                <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                                                    <label hidden={!isLoading} className="labelContext">{item.LastName}</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className = "col-md-6">
                                                <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                                                    <label hidden={!isLoading} className="labelTitle">Email</label>
                                                </div>
                                                <div className = "col-md-6">
                                                <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                                                    <label hidden={!isLoading} className="labelContext">{item.EmailAddress}</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className = "col-md-6">
                                                <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                                                    <label hidden={!isLoading} className="labelTitle">Contact Number</label>
                                                </div>
                                                <div className = "col-md-6">
                                                <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                                                    <label hidden={!isLoading} className="labelContext">{item.ContactNumber}</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className = "col-md-6">
                                                <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                                                    <label hidden={!isLoading} className="labelTitle">Description</label>
                                                </div>
                                                <div className = "col-md-6">
                                                <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                                                    <label hidden={!isLoading} className="labelContext">{item.Description}</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className = "col-md-6">
                                                <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                                                    <label hidden={!isLoading} className="labelTitle">Available Days</label>
                                                </div>
                                                <div className = "col-md-6">
                                                <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                                                    <label hidden={!isLoading} className="labelContext">{item.AvailableDays}</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className = "col-md-6">
                                                <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                                                    <label hidden={!isLoading} className="labelTitle">Consultation Fee</label>
                                                </div>
                                                <div className = "col-md-6">
                                                <Skeleton hidden={isLoading} animation="wave" height={10} width="25%" />
                                                    <label hidden={!isLoading} className="labelContext">{item.ConsultationFee}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    </div>
                                </div>
                
                            </div>
                        </div>
                    </ModalBody>
                    )
                })}
                <ModalFooter>
                    <button onClick={toggleModalViewProfile} className='btnCancel'><IoIcons.IoReturnUpBackOutline/> Back</button>
                    <button onClick={toggleModalBook} className='btnAdd'>Book Me</button>
                </ModalFooter>
            </Modal>

            {/** BOOKING  */}
            <Modal centered backdrop='static' size='md' isOpen={modalBook}>
                <ModalHeader>
                    Book a Consulatation
                </ModalHeader>
                    <ModalBody>
                    <FormControl error={error == 1 && pet_id == ""}variant="outlined" style={{width: '100%', height: '10%'}}>
                            <InputLabel style={{marginLeft: '30px'}} >Pet</InputLabel>
                            <Select                               
                                native
                                style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                                label="MyPet"
                                onChange={e=> setPetID(e.target.value)}
                            >
                            <option selected disabled>Select</option>
                            {petData.map((item)=> {
                                return(
                                    <option value={item.PetID}>{item.Name}</option>
                                )
                            })}  
                            </Select>
                        </FormControl>
                        <br/><br/>
                        <TextField
                            label="Doctor's Schedule"
                            variant='outlined'
                            style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                            value={availableDays}
                            focused
                            disabled
                        />
                        <br/>
                        <TextField
                            label="Consultation Fee"
                            variant='outlined'
                            style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                            value={consultation_fee}
                            focused
                            disabled
                        />
                        <br/>
                        <Input
                            invalid={error == 1 && date == ""}
                            label='Date'
                            //variant='outlined'
                            style={{padding:'15px',width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                            type='date'
                            onChange={handleDate}
                            //InputLabelProps={{
                                //shrink: true,
                            //}}
                            min={new Date().toISOString().split('T')[0]}     
                        />
                        <br/>
                        <FormControl disabled={date == ""} error={error == 1 && time == ""} variant="outlined" style={{width: '100%', height: '10%'}}>
                            <InputLabel style={{marginLeft: '30px'}} >Time</InputLabel>
                            <Select                              
                                native
                                style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                                label="MyPet"
                                onChange={e=> setTime(e.target.value)}
                            >
                            <option selected disabled>{invalidTime ? invalidTime : "Select"}</option>
                            {timeData.map((item)=> {
                                return(
                                    <option hidden={invalidTime} value={invalidTime ? invalidTime : item.Time}>{invalidTime ? invalidTime : item.Time}</option>
                                )
                            })}                          
                            </Select>
                        </FormControl>
                        <br/><br/>
                        <div className='imgWrapper'>
                            <img className='modal-img' src = {QR}/>
                            <label style={{marginRight:'22px'}}>Please pay reservation fee of at least Php 150.00 via this Gcash QR code and attach the screenshot of the transaction in the field below.</label>
                        </div>
                        <br/>
                        <TextField
                            error={error == 1 && reservation_fee == ""}
                            label='Reservation Amount'
                            variant='outlined'
                            style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                            onChange={e=> setReservationFee(e.target.value)}
                        />
                        <br/>
                        <label style={{marginLeft:'22px'}}>Upload Screenshot</label>
                        <Input 
                            invalid={error == 1 && reservation_reference == ""}
                            type='file'
                            style={{ width: "90%", justifyContent: "center", display: "flex", margin: "auto" }}
                            onChange={e=> setReservationReference(e.target.files[0])}
                        ></Input>
                    </ModalBody>
                <ModalFooter>
                    <CircularProgress hidden={isLoading}/>
                    <button hidden={!isLoading} onClick={toggleModalBook} className='btnCancel'><IoIcons.IoReturnUpBackOutline/> Back</button>
                    <button hidden={!isLoading} onClick={handleBook} className='btnAdd'>Book</button>
                </ModalFooter>
            </Modal>
            <Container>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
            <div className='h2-wrapper'>  
                <h2>Consultation Records <button onClick={toggleModalConsult} className="btnBook">Book a Consultation</button> </h2>
            </div>
            <div className="containerTable">             
                <div className="tableWrapper">
                    <table>
                        <tr>
                            <th>Date</th>   
                            <th>Time</th>                          
                            <th>Doctor's Name</th>
                            <th>Owner's Name</th>
                            <th>Pet Name</th>
                            <th>Meet Link</th>
                            <th>Consultation Fee</th>
                            <th>Reservation Fee</th>
                            <th>Reservation Reference</th>
                            <th>Balance</th>
                            <th>Balance Reference</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        {consultData.map((item)=> {
                            return(
                                <tr>
                                    <td className='date'>{Moment(item.Date).format('LL')}</td>
                                    <td>{item.Time}</td>
                                    <td>{item.DoctorName}</td>
                                    <td>{item.OwnerName}</td>
                                    <td>{item.PetName}</td>
                                    <td><a href={item.GoogleMeetLink}>{item.GoogleMeetLink}</a></td>
                                    <td>{item.ConsultationFee}</td>
                                    <td>{item.ReservationFee}</td>
                                    <td style={{textAlign:'center'}}>
                                        <a target='_blank' href={item.ReservationReference}><img className='tableImg' src={item.ReservationReference}/></a>
                                    </td>
                                    <td>{item.Balance}</td>   
                                    <td style={{textAlign:'center'}}>
                                        <a hidden={item.BalanceReference == null} target='_blank' href={item.BalanceReference}><img className='tableImg' src={item.BalanceReference}/></a>
                                    </td> 
                                    <td>
                                        <label>{item.Status}</label>
                                    </td>                         
                                    <td>
                                        <button hidden={item.Status != "DONE, FOR FULL PAYMENT"} onClick={()=>toggleSettleModal(item.ConsultationFee)} className="btnView">{item.Status == "DONE, FOR FULL PAYMENT" ? "Settle Remaining Balance" : " "}</button>
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

export default Consult
