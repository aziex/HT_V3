import { Avatar, Box, Divider, Grid, Paper, Skeleton, Typography } from "@mui/material";
import setColor from "../../../UTILS/set-color";
import generateLabel from "../../../UTILS/avatar-label";
import { Fragment, memo } from "react";
import { LoadingButton } from "@mui/lab";

const UserBanner = ({
    fullname,
    avatar,
    // last_online,
    is_loading,
    username,
    member_id,
    headline,
    is_my_info,
}: any) => {

    return(
        <Box>
            <Box>
                {is_loading? (
                    <Skeleton/> 
                    ):( <Box
                        sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      >
                        <Avatar
                        sx={{
                            backgroundColor: setColor(fullname),
                            color: '#fff',
                            width: 110,
                            height: 110,
                            fontSize:'70px',
                            fontWeight:'bold',
                        }}
                        alt={fullname}
                        src={avatar?.medium}>

                            {generateLabel (fullname, 1)}

                        </Avatar>
                        </Box>
                        )}
                <Box 
                marginTop={2} 
                sx={{ display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center'
                }}>

                    <Box marginBottom={1}>
                    <Typography sx={{fontWeight:'500px'}}>
                        {is_loading? <Skeleton sx={{width:200}} />:fullname}
                    </Typography>
                    </Box>

                    {/* <Box marginBottom={1}>
                    {is_my_info ? (
                         <Skeleton/>
                    ):(<Typography>
                    {is_loading ?(
                        <Skeleton sx={{width:'100px'}} />
                        ):(<Fragment> ID:{`${member_id}`}</Fragment>
                        )}
                </Typography>)}

                </Box> */}

                  {/* <Box>                      
                    {is_my_info ? (
                         <Skeleton/>
                     ):(<Typography >
                      {is_loading ?(
                          <Skeleton sx={{width:'100px'}} />
                          ):(<Fragment> {`${username}`}</Fragment>
                          )}
                  </Typography>)}
                    </Box> */}
                </Box>

                <Box 
                marginTop={3}
        sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
          }}>
        <LoadingButton 
        variant="contained" sx={{borderRadius:'50px'}}>
          <Typography color='inherit' sx={{fontWeight:'500',  textTransform: 'none' }}>
            Edit your profile
          </Typography>
        </LoadingButton>
        </Box>

        <Box>
          <Paper variant='outlined' 
          sx={{ 
              width: '300px', 
              height: '300px', 
              marginTop:'30px', 
              alignItems: 'flex-start', 
              padding:'20px'}}>

          <Grid >
            <Typography fontWeight='600'>
              About Me
            </Typography>
            </Grid>

            <Divider style={{width:'100%'}} sx={{my:'20px'}}/>

          </Paper>
        </Box>

            </Box>
        </Box>
    );
};

export default memo(UserBanner);