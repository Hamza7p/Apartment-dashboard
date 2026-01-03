import { Box, Grid, Typography } from '@mui/material'
import { t } from 'i18next'
import React from 'react'

const UserInfo = ({ user = {} }) => {
  return (
    <Box>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Typography variant='h5'>{t('users.personal_photo')}</Typography>
                <img src={user?.personal_photo?.url} alt="Personal Photo" 
                    width="150" height="150" 
                    style={{ borderRadius: '8px', marginTop: '8px' }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
            </Grid>
        </Grid>
    </Box>
  )
}

export default UserInfo