import styled from "styled-components";

export const DoctorsContainer = styled.div`
    height: 800px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;

    @media screen and (max-width: 768px) {
        height: 1100px;
    }

    @media screen and (max-width: 480px) {
        height: 1300px;
    }
`

export const DoctorWrapper = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    grid-gap: 16px;
    padding: 0 50px;

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
        max-width: 500px;
    }

`

export const DoctorCard = styled.div`
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 10px;
    max-height: 600px;
    padding-bottom: 100px;
    margin-right: 15px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.5);
    transition: all 0.2s ease-in-out;

    &:hover {
        transform: scale(1.02);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }

    @media screen and (max-width: 1000px) {
        padding-bottom: 40px;
    }
    @media screen and (max-width: 768px) {
        padding-bottom: 10px;
    }
`

export const DoctorsIcon = styled.img`
    height: 50%;
    width: 100%;
    border-radius: 10px;
    margin-bottom: 10px;

    @media screen and (max-width: 768px) {
        width: 100%;
        border-radius: 10px;
    }
`

export const DoctorH1 = styled.h1`
    font-size: 2.5rem;
    color: #00b8d4;
    margin-bottom: 64px;
    font-weight: bold;

    @media screen and (max-width: 480px) {
        font-size: 2rem;
    }
`

export const DoctorsH2 = styled.h2`
    font-size: 1rem;
    margin-bottom: 10px;
    color: #00b8d4;
`

export const DoctorsP = styled.p`
    font-size: 1rem;
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
`




