import React, { useState, useEffect } from 'react'
import VetNavbar from './Navbar'
import Iframe from 'react-iframe'
import api from '../../api/api'

const Calendar = () => {


    const getToken = sessionStorage.getItem('token')
    const email = sessionStorage.getItem('email')
    
    
    const iFrameUrl = `https://calendar.google.com/calendar/embed?src=${email.split('@')[0]}%40gmail.com&ctz=Asia%2FManila`
    
    return (
        <>
            <VetNavbar/>
            <Iframe
                src={iFrameUrl}
                style="border: 2" 
                width="100%" 
                height="700" 
                frameborder="0" 
                scrolling="yes"
                allowFullScreen
            />  
        </>
    )
}

export default Calendar
