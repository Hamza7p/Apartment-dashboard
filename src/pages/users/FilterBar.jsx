import { Search } from '@mui/icons-material'
import { Box, Button, InputBase, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { UserStatus } from '@/enums/UserStatus'

const FilterBar = ({ statusFilter, searchKeyword, onStatusFilter, onSearch }) => {
  const { t } = useTranslation()
  const [searchValue, setSearchValue] = useState(searchKeyword || '')

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value)
  }

  const handleSearchSubmit = () => {
    onSearch(searchValue)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit()
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        backgroundColor: 'background.paper',
        px: 3,
        py: 2,
        borderRadius: 2,
        boxShadow: 3,
        flexWrap: { xs: 'wrap', sm: 'nowrap' },
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
        <Button
          variant={statusFilter === 'all' ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => onStatusFilter('all')}
          sx={{ minWidth: 80 }}
        >
          {t('users.all')}
        </Button>
        <Button
          variant={statusFilter === UserStatus.approved.toString() ? 'contained' : 'outlined'}
          color="success"
          onClick={() => onStatusFilter(UserStatus.approved.toString())}
          sx={{ minWidth: 100 }}
        >
          {t('users.approved')}
        </Button>
        <Button
          variant={statusFilter === UserStatus.pending.toString() ? 'contained' : 'outlined'}
          color="warning"
          onClick={() => onStatusFilter(UserStatus.pending.toString())}
          sx={{ minWidth: 100 }}
        >
          {t('users.pending')}
        </Button>
        <Button
          variant={statusFilter === UserStatus.rejected.toString() ? 'contained' : 'outlined'}
          color="error"
          onClick={() => onStatusFilter(UserStatus.rejected.toString())}
          sx={{ minWidth: 100 }}
        >
          {t('users.rejected')}
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          px: 1.5,
          py: 0.5,
          width: { xs: '100%', sm: 350 },
          backgroundColor: 'background.default',
        }}
      >
        <InputBase
          placeholder={t('users.searchPlaceholder')}
          value={searchValue}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          sx={{ flex: 1, px: 1 }}
        />
        <IconButton onClick={handleSearchSubmit} size="small" color="primary">
          <Search />
        </IconButton>
      </Box>
    </Box>
  )
}

export default FilterBar