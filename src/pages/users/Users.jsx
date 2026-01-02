import TitleBar from '@/components/layouts/TitleBar'
import { Container } from '@mui/material'
import { t } from 'i18next'
import React from 'react'
import FilterBar from './FilterBar'
import UsersTable from './UsersTable'

const Users = () => {

  const handleAddUser = () => {
    // Logic to handle adding a new user
  }
  return (
    <Container>
      <TitleBar title={t("pages.users")} buttonTitle={t('users.addUser') } onClick={handleAddUser} />
      <FilterBar />
      <UsersTable />
    </Container>

  )
}

export default Users