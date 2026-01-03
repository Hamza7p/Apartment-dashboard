import TitleBar from '@/components/layouts/TitleBar'
import { Container } from '@mui/material'
import { t } from 'i18next'
import React from 'react'
import FilterBar from './FilterBar'
import UsersTable from './UsersTable'
import { useUsers } from '@/hooks/api/useUsers'

const Users = () => {

  const {data: users, isLoading} = useUsers();
  console.log(users);
  const handleAddUser = () => {
    // Logic to handle adding a new user
  }
  return (
    <Container>
      <TitleBar title={t("pages.users")} buttonTitle={t('users.addUser') } onClick={handleAddUser} />
      <FilterBar />
      <UsersTable users={users} loading={isLoading} />
    </Container>

  )
}

export default Users