import React from 'react'
import Icon1 from '../../images/doctor1.jpg'
import Icon2 from '../../images/doctor2.jpg'
import Icon3 from '../../images/doctor3.jpg'
import { 
    DoctorsContainer,
    DoctorH1, 
    DoctorWrapper, 
    DoctorCard, 
    DoctorsIcon, 
    DoctorsH2, 
    DoctorsP
} from './DoctorElements'

const doctors = () => {
    return (
        <>
            <DoctorsContainer id="doctors">
                <DoctorH1>Meet our Doctors</DoctorH1>
                <DoctorWrapper>
                    <DoctorCard>
                        <DoctorsIcon src={Icon1}/>
                        <DoctorsH2>Loren Ipsum</DoctorsH2>
                        <DoctorsP>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        </DoctorsP>
                    </DoctorCard>
                    <DoctorCard>
                        <DoctorsIcon src={Icon2}/>
                        <DoctorsH2>Loren Ipsum</DoctorsH2>
                        <DoctorsP>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        </DoctorsP>
                    </DoctorCard>
                    <DoctorCard>
                        <DoctorsIcon src={Icon3}/>
                        <DoctorsH2>Loren Ipsum</DoctorsH2>
                        <DoctorsP>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        </DoctorsP>
                    </DoctorCard>
                </DoctorWrapper>
            </DoctorsContainer>
        </>
    )
}

export default doctors
