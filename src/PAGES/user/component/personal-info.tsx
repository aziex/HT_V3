import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import {
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Tooltip,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { dateFormat, dateTime } from '../../../UTILS/date-moment';
const UserBanner = ({
  fullname,
  created_at,
  modified_at,
  phone_number,
  email,
  is_loading,
  birthdate,
  id,
  handleManageInfo,
  is_my_info,
}: any) => {
  const { user } = useSelector((state: any) => state);

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {is_my_info ? (
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 2, height: '100%' }}>
            <Typography
              sx={{ display: 'flex', alignItems: 'center' }}
              component={'div'}
              color='text.secondary'
              variant='h6'
              gutterBottom
            >
              <Typography
                sx={{ flexGrow: 1 }}
                color='text.secondary'
                variant='h6'
              >
                Personal Information
              </Typography>

              {id === user.session?.data?.id ? (
                <Tooltip title='Manage Info'>
                  <IconButton
                    sx={{ color: 'inherit' }}
                    onClick={handleManageInfo}
                    edge='end'
                  >
                    <ModeEditOutlinedIcon sx={{ color: 'inherit' }} />
                  </IconButton>
                </Tooltip>
              ) : null}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              {is_my_info ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                  }}
                >
                  <Typography
                    variant='subtitle1'
                    color='text.secondary'
                    sx={{
                      fontWeight: 500,
                      minWidth: { xs: '100%', sm: '150px' },
                    }}
                  >
                    Email:
                  </Typography>
                  <Typography
                    component={'div'}
                    sx={{
                      fontWeight: 500,
                    }}
                    variant='body1'
                  >
                    {is_loading ? <Skeleton sx={{ width: '200px' }} /> : email}
                  </Typography>
                </Box>
              ) : null}
              {is_my_info ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                  }}
                >
                  <Typography
                    variant='subtitle1'
                    color='text.secondary'
                    sx={{
                      fontWeight: 500,
                      minWidth: { xs: '100%', sm: '150px' },
                    }}
                  >
                    Phone Number:
                  </Typography>
                  <Typography
                    component={'div'}
                    sx={{
                      fontWeight: 500,
                    }}
                    variant='body1'
                  >
                    {is_loading ? (
                      <Skeleton sx={{ width: '200px' }} />
                    ) : phone_number ? (
                      phone_number
                    ) : (
                      '-'
                    )}
                  </Typography>
                </Box>
              ) : null}
              {is_my_info ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                  }}
                >
                  <Typography
                    variant='subtitle1'
                    color='text.secondary'
                    sx={{
                      fontWeight: 500,
                      minWidth: { xs: '100%', sm: '150px' },
                    }}
                  >
                    Birth Date:
                  </Typography>
                  <Typography
                    component={'div'}
                    sx={{
                      fontWeight: 500,
                    }}
                    variant='body1'
                  >
                    {is_loading ? (
                      <Skeleton sx={{ width: '200px' }} />
                    ) : birthdate ? (
                      dateFormat(birthdate)
                    ) : (
                      '-'
                    )}
                  </Typography>
                </Box>
              ) : null}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Typography
                  variant='subtitle1'
                  color='text.secondary'
                  sx={{
                    fontWeight: 500,
                    minWidth: { xs: '100%', sm: '150px' },
                  }}
                >
                  Registered Date:
                </Typography>
                <Typography
                  component={'div'}
                  sx={{
                    fontWeight: 500,
                  }}
                  variant='body1'
                >
                  {is_loading ? (
                    <Skeleton sx={{ width: '200px' }} />
                  ) : (
                    dateTime(created_at)
                  )}
                </Typography>
              </Box>

              <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <Typography
                variant='subtitle1'
                sx={{
                  fontWeight: 'bold',
                  minWidth: { xs: '100%', sm: '150px' },
                }}
              >
                Updated Date:
              </Typography>
              <Typography variant='body1'>
                {is_loading ? (
                  <Skeleton sx={{ width: '200px' }} />
                ) : modified_at ? (
                  dateTime(modified_at)
                ) : (
                  '-'
                )}
              </Typography>
            </Box>
            </Box>
          </Paper>
        </Grid>
      ) : null}
      <Grid item xs={12} md={is_my_info ? 6 : 12}>
        
      </Grid>
    </Grid>
  );
};


export default memo(UserBanner);
