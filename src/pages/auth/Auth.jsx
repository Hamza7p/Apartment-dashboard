import { Box, Container, Grid } from '@mui/material'
import { Outlet } from 'react-router'


const Auth = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        minHeight: "100vh",
        background: (theme) => 
          `radial-gradient(circle at top left, ${theme.palette.primary.main} 0%, rgba(0,87,255,0.35) 35%, ${theme.palette.background.default} 70%)`,
        py: { xs: 6, md: 15 },
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 6, md: 10 }}
          alignItems="center"
          justifyContent="center"
        >
          <Outlet />
        </Grid>
      </Container>
    </Box>
  )
}

export default Auth