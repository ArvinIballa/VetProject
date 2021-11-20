import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import { animateScroll as scroll } from 'react-scroll'
import { 
    FooterContainer, 
    FooterWrap, 
    FooterLinksWrapper, 
    FooterLinksContainer,
    FooterLinkItems, 
    FooterLinkTitle, 
    FooterLink,
    SocialMedia,
    SocialMediaWrap,
    SocialLogo,
    WebsiteRights,
    SocialIcons,
    SocialIconLink 
} from './FooterElements'

const Footer = () => {

    const toggleHome = () => {
        scroll.scrollToTop();
    }

    return (
        <>
            <FooterContainer>
                <FooterWrap>
                    <FooterLinksContainer>
                        <FooterLinksWrapper>
                            <FooterLinkItems>
                                <FooterLinkTitle> About Us </FooterLinkTitle>
                                    <FooterLink to="book">How it works</FooterLink>
                                    <FooterLink to="about">Testimonials</FooterLink>
                                    <FooterLink to="about">Careers</FooterLink>
                                    <FooterLink to="about">Investors</FooterLink>
                                    <FooterLink to="about">Terms of Service</FooterLink>
                            </FooterLinkItems>
                            <FooterLinkItems>
                                <FooterLinkTitle> Contact Us </FooterLinkTitle>
                                    <FooterLink to="book">How it works</FooterLink>
                                    <FooterLink to="about">Testimonials</FooterLink>
                                    <FooterLink to="about">Careers</FooterLink>
                                    <FooterLink to="about">Investors</FooterLink>
                                    <FooterLink to="about">Terms of Service</FooterLink>
                            </FooterLinkItems>
                        </FooterLinksWrapper>
                        <FooterLinksWrapper>
                            <FooterLinkItems>
                                <FooterLinkTitle> About Us </FooterLinkTitle>
                                    <FooterLink to="book">How it works</FooterLink>
                                    <FooterLink to="about">Testimonials</FooterLink>
                                    <FooterLink to="about">Careers</FooterLink>
                                    <FooterLink to="about">Investors</FooterLink>
                                    <FooterLink to="about">Terms of Service</FooterLink>
                            </FooterLinkItems>
                            <FooterLinkItems>
                                <FooterLinkTitle> About Us </FooterLinkTitle>
                                    <FooterLink to="book">How it works</FooterLink>
                                    <FooterLink to="about">Testimonials</FooterLink>
                                    <FooterLink to="about">Careers</FooterLink>
                                    <FooterLink to="about">Investors</FooterLink>
                                    <FooterLink to="about">Terms of Service</FooterLink>
                            </FooterLinkItems>
                        </FooterLinksWrapper>
                    </FooterLinksContainer>
                    <SocialMedia>
                        <SocialMediaWrap>
                            <SocialLogo to='/' onClick={toggleHome}>
                                Vetra
                            </SocialLogo>
                            <WebsiteRights>Vetra © {new Date().getFullYear()} All rights reserved.</WebsiteRights>
                            <SocialIcons>
                                <SocialIconLink href="/" target="_blank" aria-label="Facebook">
                                    <FaFacebook/>
                                </SocialIconLink>
                                <SocialIconLink href="/" target="_blank" aria-label="Instagram">
                                    <FaInstagram/>
                                </SocialIconLink>
                                <SocialIconLink href="/" target="_blank" aria-label="Twitter">
                                    <FaTwitter/>
                                </SocialIconLink>
                            </SocialIcons>
                        </SocialMediaWrap>
                    </SocialMedia>
                </FooterWrap>
            </FooterContainer>
        </>
    )
}

export default Footer
