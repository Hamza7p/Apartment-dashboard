import { Accordion, AppBar, Box, Button, Card, Typography } from '@mui/material'
import React from 'react'

const TitleBar = ({title, buttonTitle, onClick = () => {}}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, backgroundColor: "background.paper", px: 3, py: 2, borderRadius: 1,
       boxShadow:"3px 3px 3px 0 rgba(0,0,0,0.2)"
     }}>

      <Typography variant="h5">{ title }</Typography>
      <Button variant="contained" onClick={onClick}>{ buttonTitle }</Button>
    </Box>
  )
}

export default TitleBar