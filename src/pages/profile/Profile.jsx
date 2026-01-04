import React from 'react'
import { Container } from '@mui/material'
import { t } from 'i18next'
import TitleBar from '@/components/layouts/TitleBar'
import UserInfo from '@/components/user/UserInfo'
import { useProfile } from '@/hooks/api/useProfile'
import { useSelector } from 'react-redux'
import { selectUserInfo } from '@/store/auth/selectors'

const Profile = () => {
  const currentUser = useSelector(selectUserInfo)
  const { data: profileData, isLoading } = useProfile()
  
  // Get user ID from profile data or current user
  const userId = profileData?.data?.id || profileData?.id || currentUser?.id

  return (
    <Container>
      <TitleBar title={t("pages.profile")} />
      {!isLoading && userId && (
        <UserInfo 
          userId={userId} 
          isOwnProfile={true} 
          allowRoleStatusEdit={false}
          useProfileUpdate={true}
        />
      )}
    </Container>
  )
}

export default Profile