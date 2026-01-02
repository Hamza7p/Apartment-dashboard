import { Box, Grid } from '@mui/material'
import StatCard from './StatCard.jsx'

const DashboardView = ({ data, isLoading, t }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title={t('dashboard.usersCount')}
            value={data?.users_count ?? 0}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title={t('dashboard.apartmentsCount')}
            value={data?.apartments_count ?? 0}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title={t('dashboard.reservationsCount')}
            value={data?.reservations_count ?? 0}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default DashboardView
