import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import './profile.css'
import { Container } from '@mui/material'
const Profile = () => {
    return (
        <>
            <br/><br/><br/>
            <Container fixed>
                <h2>PERSONAL INFORMATION</h2>
                <br/><br/>
                <Grid className='grid-container' container spacing={4}>
                    <Grid item xs={6}>
                        <Box className='box'>                     
                            <label className='headerText'>Profile</label>
                            <br/>
                            <div className='inputWrapper'>
                                <input placeholder='First name' className='input'></input>
                            </div>
                            <div className='inputWrapper'>
                                <input placeholder='Last name' className='input'></input>
                            </div>
                            <div className='inputWrapper'>
                                <input placeholder='Email' className='input'></input>
                            </div>
                            <div className='inputWrapper'>
                                <input placeholder='Contact Number' className='input'></input>
                            </div>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box className='box'>
                            <label className='headerText'>Update Password</label>
                            <br/>
                            <div className='inputWrapper'>
                                <input placeholder='Current Password' className='input'></input>
                            </div>
                            <div className='inputWrapper'>
                                <input placeholder='Confirm Password' className='input'></input>
                            </div>
                            <div>
                                <button className='buttonSave'>Save</button>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Profile
