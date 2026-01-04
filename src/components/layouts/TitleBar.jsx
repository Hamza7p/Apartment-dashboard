import { Accordion, AppBar, Box, Button, Card, Typography, IconButton } from '@mui/material'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import React from 'react'
import { useNavigate } from 'react-router'
import { useTheme } from '@mui/material/styles'

const TitleBar = ({title, buttonTitle, onClick = () => {}, showBackButton = false, onBack}) => {
  const navigate = useNavigate()
  const theme = useTheme()
  
  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }

  return (
    <Box sx={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      mb: 3, 
      backgroundColor: "background.paper", 
      px: 3, 
      py: 2, 
      borderRadius: 1,
      boxShadow:"3px 3px 3px 0 rgba(0,0,0,0.2)",
      flexDirection: theme.direction === 'rtl' ? 'row-reverse' : 'row'
    }}>
      <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        gap: 2,
        flexDirection: theme.direction === 'rtl' ? 'row-reverse' : 'row'
      }}>
        {showBackButton && (
          <IconButton onClick={handleBack} aria-label="back">
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h5">{ title }</Typography>
      </Box>
      {buttonTitle && (
        <Button variant="contained" onClick={onClick}>{ buttonTitle }</Button>
      )}
    </Box>
  )
}

export default TitleBar