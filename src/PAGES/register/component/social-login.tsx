import { Avatar, Button, Grid } from '@mui/material';
import React from 'react';
import {memo} from 'react';
import img_google from '../../../ASSETS/google-logo.png'
import img_facebook from '../../../Assets/facebook-logo.jpg'
import img_x from '../../../Assets/x-logo.jpg'
import img_linkedin from '../../../Assets/linked-logo.jpg'


const SocialLogin = () => {
    let newWindow: any = window;
    const handleBtn = (type: string) => {
        newWindow.location = `${process.env.REACT_APP_SERVER_AUTH_ENDPOINT}/${type}`;
    };

    type ButtonStyle = {
        backgroundColor: string;
        color: string;
        backgroundImage: string;
        backgroundSize: string;
        backgroundPosition: string;
        backgroundRepeat: string;
      };
      
      const getButtonStyle = (imageURL: string): ButtonStyle => ({
        backgroundColor: '#F5F8FA',
        color: '#FFF',
        backgroundImage: `url(${imageURL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      });
      
      const buttonGoogle: ButtonStyle = getButtonStyle(img_google);
      const buttonFacebook: ButtonStyle = getButtonStyle(img_facebook);
      const buttonTwitter: ButtonStyle = getButtonStyle(img_x);
      const buttonLinkedIn: ButtonStyle = getButtonStyle(img_linkedin);      

    return (
        <Grid>
            <Grid>
                <Button
                    onClick={() => handleBtn('google')}
                    variant="contained"
                    size='medium'
                    sx={buttonGoogle}
                    style={{
                    borderRadius: 10,
                    maxWidth: '50px', 
                    maxHeight: '50px', 
                    minWidth: '50px', 
                    minHeight: '50px', 
                    marginRight:'12px'
                }}
                />

                <Button
                    onClick={() => handleBtn('facebook')}
                    variant="contained"
                    size='medium'
                    sx={buttonFacebook}
                    style={{
                      borderRadius: 10,
                      maxWidth: '50px', 
                      maxHeight: '50px', 
                      minWidth: '50px', 
                      minHeight: '50px', 
                      marginRight:'12px'
                }}
                />
                
                <Button
                    onClick={() => handleBtn('twitter')}
                    variant="contained"
                    size='medium'
                    sx={buttonTwitter}
                    style={{
                    borderRadius: 10,
                    maxWidth: '50px', 
                    maxHeight: '50px', 
                    minWidth: '50px', 
                    minHeight: '50px', 
                    marginRight:'12px' 
                    }}
                />
                
                <Button
                    onClick={() => handleBtn('linkedin')}
                    variant="contained"
                    size='medium'
                    sx={buttonLinkedIn}
                    style={{
                      borderRadius: 10,
                      maxWidth: '50px', 
                      maxHeight: '50px', 
                      minWidth: '50px', 
                      minHeight: '50px', 
                      marginRight:'12px'
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default SocialLogin;
