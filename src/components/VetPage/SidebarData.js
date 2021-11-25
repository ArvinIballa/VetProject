import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as CgIcons from 'react-icons/cg'
import * as SiIcons from 'react-icons/si'

export const SidebarData = [
    {
        title: 'Profile',
        path: '/Vet/Profile',
        icon: <AiIcons.AiOutlineUser/>,
        className: 'nav-text'
    },

    {
        title: 'My Calendar',
        path: '/Vet/Calendar',
        icon: <AiIcons.AiTwotoneCalendar/>,
        className: 'nav-text'
    },

    {
        title: 'My Patients',
        path: '/Vet/Patients',
        icon: <FaIcons.FaUsers/>,
        className: 'nav-text'
    },
    {
        title: 'My Bookings',
        path: '/Vet/Bookings',
        icon: <CgIcons.CgList/>,
        className: 'nav-text'
    },

    {
        title: 'Logout',
        path: '/',
        icon: <CgIcons.CgLogOut/>,
        className: 'nav-text'
    }
]
