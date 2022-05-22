import React from 'react'
import Icon1 from '../../images/sidney.jpg'
import Icon2 from '../../images/lala.jpg'
import Icon3 from '../../images/judge.jpg'
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
                <DoctorH1>Meet our Vets</DoctorH1>
                <DoctorWrapper>
                    <DoctorCard>
                        <DoctorsIcon src={Icon1}/>
                        <DoctorsH2>Sidney Lyndon Dolores</DoctorsH2>
                        <DoctorsP>
                        Licensed Veterinarian, focusing on small animal (dogs and cats) practice. Currently honing my skills in livestock practice (cattle, goats, poultry, swine).
                        </DoctorsP>
                        <br/><br/>
                    </DoctorCard>
                    <DoctorCard>
                        <DoctorsIcon src={Icon2}/>
                        <DoctorsH2>Lala Ramchandani</DoctorsH2>
                        <DoctorsP>
                        I'm a companion animal medicine practitioner/veterinarian. I have been practicing for 3 years and have expertise ranging from basic wellness to small animal surgery and emergency medicine.
                        </DoctorsP>
                    </DoctorCard>
                    <DoctorCard>
                        <DoctorsIcon src={Icon3}/>
                        <DoctorsH2>Judge Pera</DoctorsH2>
                        <DoctorsP>
                        Home vaccination visits on weekends, e-consults weekdays after 3 pm.
                        </DoctorsP>
                    </DoctorCard>
                </DoctorWrapper>
            </DoctorsContainer>
        </>
    )
}

export default doctors
