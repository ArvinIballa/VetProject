import medicine from '../../images/med.png'
import booking from '../../images/booking.png'
import register from '../../images/register.png'

export const homeObjOne = {
    id: 'about',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'About us',
    headLine: 'We bring the vets to you',
    description: "Petra is a platform for both vet centers and freelance vets to provide online consultations for pet owners. Your pet’s health is our top priority which is why we only partner with the most trusted vets. Our main mission is to have our experts answer all anything you might want to know about your pet’s health.",
    buttonLabel: 'Be part of us',
    imgStart: false,
    img: medicine,
    alt: 'Medicine',
    dark: true,
    primary: true,
    onclick: true,
    darkText: false
}

export const homeObjTwo = {
    id: 'book',
    lightBg: true,
    lightText: false,
    lightTextDesc: true,
    topLine: 'Pick a date',
    headLine: 'Telemedicine Booking Made Easy!',
    description: 'Simply register an account, create a pet profile, choose a vet, then select a time for your online consultation!',
    buttonLabel: 'Book Now',
    imgStart: true,
    img: booking,
    alt: 'Medicine',
    dark: false,
    primary: false,
    darkText: true,
    onclick: true,
}

export const homeObjThree = {
    id: 'register',
    lightBg: true,
    lightText: false,
    lightTextDesc: true,
    topLine: 'Sign up',
    headLine: 'Don’t have an account yet?',
    description: 'Register to book your online consultations now or to apply as a vet consultant!',
    buttonLabel: "Yes, I'm In",
    onclick: false,
    imgStart: false,
    img: register,
    alt: 'Medicine',
    dark: false,
    primary: false,
    darkText: true
}