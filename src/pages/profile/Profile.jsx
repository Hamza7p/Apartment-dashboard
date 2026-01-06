import React from 'react'
import { Container } from '@mui/material'
import { t } from 'i18next'
import TitleBar from '@/components/layouts/TitleBar'
import UserInfo from '@/components/user/UserInfo'
import { useProfile } from '@/hooks/api/useProfile'

const Profile = () => {

  const { data: userData, isLoading, error, refetch } = useProfile()

  return (
    <Container>
      <TitleBar title={t("pages.profile")} />
       <UserInfo 
          userData={userData} 
          isProfile={true}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
        />
    </Container>
  )
}

export default Profile