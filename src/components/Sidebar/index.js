import React from 'react'
import { 
    SidebarContainer, 
    Icon, 
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarLink,
    SideBtnWrap,
    SidebarRoute
} from './SidebarElements'

const Sidebar = ({isOpen, toggle}) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to = "about" onClick={toggle}>About</SidebarLink>
                    <SidebarLink to = "book" onClick={toggle}>Booking</SidebarLink>
                    <SidebarLink to = "doctors" onClick={toggle}>Doctors</SidebarLink>
                    <SidebarLink to = "register" onClick={toggle}>Register</SidebarLink>
                </SidebarMenu>
                <SideBtnWrap>
                    <SidebarRoute to='/signin'>Log In</SidebarRoute>
                </SideBtnWrap>
        </SidebarWrapper>
        </SidebarContainer>
        
    )
}

export default Sidebar
