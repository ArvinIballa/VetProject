import React from 'react'
import VetIcon from '../../images/vet.png'
import { 
    Container, 
    FormWrap, 
    Icon, 
    FormContent, 
    Form, 
    FormH1, 
    FormLabel, 
    FormInput, 
    FormButton, 
    Text,
    FormRow,
    Img
} from './SigninElements'

const Signin = () => {
    return (
        <>
            <Container>
                <FormWrap>
                    <Icon to="/">Vetra</Icon>
                    <FormContent>
                        <Form action="#">
                            <FormRow>
                                
                                <FormH1>Sign in to your account</FormH1>
                                <Img src={VetIcon}></Img>
                                <FormLabel htmlFor='for'>Email</FormLabel>
                                <FormInput type='email' required></FormInput>
                                <FormLabel htmlFor='for'>Password</FormLabel>
                                <FormInput type='password' required></FormInput>
                                <FormButton type='submit'>Log In</FormButton>
                                <Text>Forgot Password?</Text>
                            </FormRow>
                        </Form>
                        
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
}

export default Signin
