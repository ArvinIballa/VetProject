import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import './profile.css'
const Profile = () => {
    return (
        <>
            <Grid className='grid-container' container spacing={4}>
                <Grid item xs={4}>
                    <Box className='box'>                     
                        <label className='headerText'>Profile</label>
                        <br/><br/>
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
                <Grid item xs={4}>
                    <Box className='box'>
                        <label className='headerText'>Update Password</label>
                        <br/><br/>
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
        </>
    )
}

export default Profile
