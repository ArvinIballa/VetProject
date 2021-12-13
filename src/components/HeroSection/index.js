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
                    <HeroH1>Welcome to Petra</HeroH1>
                    <HeroP>
                        In Petra, we bring the vets to you. Schedule an online consultation with some of our verified vets today.
                    </HeroP>
                    <HeroBtnWrapper>
                        <Button 
                            to="about"
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
