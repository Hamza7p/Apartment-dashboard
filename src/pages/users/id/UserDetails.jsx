import TitleBar from '@/components/layouts/TitleBar'
import UserInfo from '@/components/user/UserInfo'
import { Container } from '@mui/material'
import { t } from 'i18next'
import React from 'react'
import { useParams } from 'react-router'
import { useUser } from '@/hooks/api/useUsers'

const UserDetails = () => {
  const { id: userId } = useParams();
  const { data: userData, isLoading, error, refetch } = useUser(userId);

  return (
    <Container>
      <TitleBar 
        title={t("users.user_details")} 
        showBackButton={true}
      />
      <UserInfo 
        userData={userData} 
        isProfile={false}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
      />
    </Container>
  )
}

export default UserDetails