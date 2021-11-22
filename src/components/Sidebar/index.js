import React, { useState } from 'react'
import { 
    SidebarContainer, 
    Icon, 
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarLink,
    SideBtnWrap,
    Button,
    Style,
    Img,
    ImgLink
} from './SidebarElements'

import Client from '../../images/client.png'
import Vet from '../../images/vet.png'

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop'
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';

const Sidebar = ({isOpen, toggle}) => {

    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }

    return (
        <>
        <Modal 
            open={modal} 
            onClose={toggleModal} 
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
        <Style>
            <Typography style={{color: '#00b8d4', textAlign: 'center', fontSize: '160%'}} id="modal-modal-title" variant="h6" component="h2">
                Log in as
            </Typography>
            <br/>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Tooltip title="Client" placement="bottom">
                            <ImgLink to={'/signinclient'}>
                                <Img src={Client}></Img>
                            </ImgLink>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={6}>
                        <Tooltip title="Veterinarian" placement="bottom">
                            <ImgLink to={'/signinvet'}>
                                <Img src={Vet}></Img>
                            </ImgLink>
                        </Tooltip>
                    </Grid>
                </Grid>
        </Style>
        </Modal>
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
                    <Button onClick={toggleModal}>Log In</Button>
                </SideBtnWrap>
        </SidebarWrapper>
        </SidebarContainer>
    </>
    )
}

export default Sidebar
