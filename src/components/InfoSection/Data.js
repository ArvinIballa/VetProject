import medicine from '../../images/med.png'
import booking from '../../images/booking.png'
import register from '../../images/register.png'

export const homeObjOne = {
    id: 'about',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Lorem Ipsum',
    headLine: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
    buttonLabel: 'Get Started',
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
    headLine: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
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
    topLine: 'Join us',
    headLine: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
    buttonLabel: "Yes, I'm In",
    onclick: false,
    imgStart: false,
    img: register,
    alt: 'Medicine',
    dark: false,
    primary: false,
    darkText: true
}