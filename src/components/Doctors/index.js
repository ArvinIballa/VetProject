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
                <DoctorH1>Meet the Team</DoctorH1>
                <DoctorWrapper>
                    <DoctorCard>
                        <DoctorsIcon src={Icon1}/>
                        <DoctorsH2>Sarah Jones</DoctorsH2>
                        <DoctorsP>
                        With over 10 years of experience in Dog care, Sarah is a reliable veterinarian who will treat your dog with the utmost care and attention.
                        </DoctorsP>
                        <br/><br/>
                    </DoctorCard>
                    <DoctorCard>
                        <DoctorsIcon src={Icon2}/>
                        <DoctorsH2>Jake Smith</DoctorsH2>
                        <DoctorsP>
                        A veterinarian specializing in the care of cats and dogs. Having been in practice for over eight years, Jake’s long experience and familiarity with the business allow to properly take care of your pet no matter the condition.
                        </DoctorsP>
                    </DoctorCard>
                    <DoctorCard>
                        <DoctorsIcon src={Icon3}/>
                        <DoctorsH2>Marcus Erricson</DoctorsH2>
                        <DoctorsP>
                        A herp veterinarian specializing in the treatment of turtles, lizards, or other reptilian pets. Marcus’ numerous years of experience will allow him to recognize and treat your reptile pets and assure their health and good condition.
                        </DoctorsP>
                    </DoctorCard>
                </DoctorWrapper>
            </DoctorsContainer>
        </>
    )
}

export default doctors
