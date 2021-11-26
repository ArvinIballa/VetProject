import React from 'react'
import VetNavbar from './Navbar'
import Iframe from 'react-iframe'
const calendar = () => {
    return (
        <>
            <VetNavbar/>
            <Iframe
                src="https://calendar.google.com/calendar/embed?src=arviniballa6%40gmail.com&ctz=Asia%2FManila" 
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

export default calendar
