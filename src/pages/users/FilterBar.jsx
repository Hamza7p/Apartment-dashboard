
import { Search } from '@mui/icons-material'
import { Box, Button, Input, InputBase } from '@mui/material'
import React from 'react'

const FilterBar = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, backgroundColor: "background.paper", px: 3, py: 2, borderRadius: 1,
      boxShadow:"3px 3px 3px 0 rgba(0,0,0,0.2)"
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button variant="outlined" color='primary'>All</Button>
        <Button variant="outlined" color='success'>Approved</Button>
        <Button variant="outlined" color='warning'>Pending</Button>
        <Button variant="outlined" color='error'>Rejected</Button>
      </Box> 

      <InputBase placeholder='Search user...' sx={{ 
        border: "1px solid", borderColor: "grey.400", 
        borderRadius: 1, px: 2, py: 1, width: 350 
        }}
      />
    </Box>
  )
}

export default FilterBar