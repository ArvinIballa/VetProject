import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as GiIcons from 'react-icons/gi'
import * as SiIcons from 'react-icons/si'
import * as IoIcons from 'react-icons/io5'
import * as RiIcons from 'react-icons/ri'

export const SidebarData = [
    {
        title: 'Profile',
        path: '/Admin/Profile',
        icon: <AiIcons.AiOutlineUser/>,
        className: 'nav-text'
    },

    {
        title: 'Admin Accounts',
        path: '/Admin/Accounts',
        icon: <RiIcons.RiAdminLine/>,
        className: 'nav-text'
    },

    {
        title: 'Consultations',
        path: '/Admin/Consult',
        icon: <FaIcons.FaTeamspeak/>,
        className: 'nav-text'
    },

    {
        title: 'Pet Owners',
        path: '/Admin/PetOwner',
        icon: <SiIcons.SiDatadog/>,
        className: 'nav-text'
    },

    {
        title: 'Vets',
        path: '/Admin/Vets',
        icon: <GiIcons.GiDoctorFace/>,
        className: 'nav-text'
    },

]
