import React, {useState} from 'react'
import {FaBars} from 'react-icons/fa'
import { IconContext } from 'react-icons/lib'
import { animateScroll as scroll } from 'react-scroll'
import { 
    Nav, 
    NavbarContainer, 
    NavLogo, 
    MobileIcon, 
    NavMenu, 
    NavItem, 
    NavLinks,
    NavBtn,
    Button,
    Img,
    Style, 
    ImgLink,
    TextTitle,
    LabelWrapper
} from './NavbarElements'

import Client from '../../images/client.png'
import Vet from '../../images/vet.png'
import Admin from '../../images/admin.png'

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop'
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';


const Navbar = ({ toggle }) => {
    
    const toggleHome = () => {
        scroll.scrollToTop();
    }

    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }

    return (
        <>
        <Modal open={modal} onClose={toggleModal} aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}>
            <Style>
                <Typography style={{color: '#00b8d4', textAlign: 'center', fontSize: '160%'}} id="modal-modal-title" variant="h6" component="h2">
                Log in as
                </Typography>
                <br/>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                            <ImgLink to={'/signinclient'}>
                                <Img src={Client}></Img>
                            </ImgLink>
                            <LabelWrapper>
                                <TextTitle className='title'>Client</TextTitle> 
                            </LabelWrapper>      
                    </Grid>
                    <Grid item xs={4}>
                            <ImgLink to={'/signinvet'}>
                                <Img src={Vet}></Img>
                            </ImgLink>
                            <LabelWrapper>
                                <TextTitle className='title'>Veterinarian</TextTitle>
                            </LabelWrapper>
                    </Grid>
                    <Grid item xs={4}>
                        <ImgLink to={'/signinadmin'}>
                            <Img src={Admin}></Img>
                        </ImgLink>
                        <LabelWrapper>
                            <TextTitle>Admin</TextTitle>
                       </LabelWrapper>
                    </Grid>
                </Grid>
            </Style>
        </Modal>
        <IconContext.Provider value={{ color: '#00b8d4' }}>
            <Nav>
                <NavbarContainer>
                    <NavLogo to='/' onClick={toggleHome}>
                        Petra
                    </NavLogo>
                    <MobileIcon onClick={toggle}>
                        <FaBars/>
                    </MobileIcon>
                    <NavMenu>
                        <NavItem>
                            <NavLinks 
                                to="about"
                                smooth={true}
                                duration={100}
                                spy={true}
                                exact='true'
                                offset={-80}
                                >About</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks 
                                to="book"
                                smooth={true}
                                duration={100}
                                spy={true}
                                exact='true'
                                offset={-80}
                                >Booking</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks 
                                to="doctors"
                                smooth={true}
                                duration={100}
                                spy={true}
                                exact='true'
                                offset={-80}
                                >Our Doctors</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks 
                                to="register"
                                smooth={true}
                                duration={100}
                                spy={true}
                                exact='true'
                                offset={-80}
                                >Register</NavLinks>
                        </NavItem>
                    </NavMenu>
                    <NavBtn>
                        <Button onClick={toggleModal}>Log In</Button>
                    </NavBtn>
                </NavbarContainer>
            </Nav>
        </IconContext.Provider>
        </>
    )
}

export default Navbar
