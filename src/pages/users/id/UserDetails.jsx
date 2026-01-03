import TitleBar from '@/components/layouts/TitleBar'
import UserInfo from '@/components/user/UserInfo'
import { useUser } from '@/hooks/api/useUsers'
import { Container } from '@mui/material'
import { t } from 'i18next'
import React from 'react'
import { useParams } from 'react-router'


const UserDetails = () => {

  const { id: userId } = useParams()
  console.log(userId);
  const user = useUser(userId);

  return (
    <Container>
      <TitleBar title={t("users.user_details")} buttonTitle={t("users.update")}/>
      <UserInfo user={user} />
    </Container>
  )
}

export default UserDetails