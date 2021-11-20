import React, {useState} from 'react'
import bg from '../../images/Bg.jpg'
import { Button } from '../ButtonElements'
import { 
    HeroContainer,
    HeroBg, 
    PictureBg,
    HeroContent,
    HeroH1,
    HeroP,
    HeroBtnWrapper,
    ArrowForward,
    ArrowRight 
} from './HeroElements'
const HeroSection = () => {

    const [hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }

    return (
        <>
            <HeroContainer>
                <HeroBg>
                    <PictureBg src={bg}></PictureBg>
                </HeroBg>
                <HeroContent>
                    <HeroH1>Welcome to Vetra</HeroH1>
                    <HeroP>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    </HeroP>
                    <HeroBtnWrapper>
                        <Button 
                            to="signup" 
                            onMouseEnter={onHover} 
                            onMouseLeave={onHover}
                            primary='true'
                            dark='true'
                        >
                            Get Started {hover ? <ArrowForward /> : <ArrowRight/>} 
                        </Button>
                    </HeroBtnWrapper>
                </HeroContent>
            </HeroContainer>
        </>
    )
}

export default HeroSection
