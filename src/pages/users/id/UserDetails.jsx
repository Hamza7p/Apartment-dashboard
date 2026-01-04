import TitleBar from '@/components/layouts/TitleBar'
import UserInfo from '@/components/user/UserInfo'
import { Container } from '@mui/material'
import { t } from 'i18next'
import React from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { selectUserInfo } from '@/store/auth/selectors'

const UserDetails = () => {
  const { id: userId } = useParams()
  const currentUser = useSelector(selectUserInfo)
  const isOwnProfile = currentUser?.id?.toString() === userId

  return (
    <Container>
      <TitleBar 
        title={t("users.user_details")} 
        showBackButton={true}
      />
      <UserInfo userId={userId} isOwnProfile={isOwnProfile} />
    </Container>
  )
}

export default UserDetails