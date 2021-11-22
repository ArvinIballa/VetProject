import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as CgIcons from 'react-icons/cg'
import * as SiIcons from 'react-icons/si'

export const SidebarData = [
    {
        title: 'Profile',
        path: '/Client/Profile',
        icon: <AiIcons.AiOutlineUser/>,
        className: 'nav-text'
    },

    {
        title: 'Consult',
        path: '/Client/Consult',
        icon: <FaIcons.FaUserFriends/>,
        className: 'nav-text'
    },

    {
        title: 'My Pets',
        path: '/Client/MyPets',
        icon: <SiIcons.SiDatadog/>,
        className: 'nav-text'
    },

    {
        title: 'Logout',
        path: '/',
        icon: <CgIcons.CgLogOut/>,
        className: 'nav-text'
    }
]
