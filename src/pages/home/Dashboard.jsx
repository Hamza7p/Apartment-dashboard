import { useSystemData } from '@/hooks/api/useSystem'
import { useTranslation } from 'react-i18next'
import AnimatedServerError from '@/components/errors/AnimatedServerError'
import DashboardView from './DashboardView'

const DashboardContainer = () => {
  const { t } = useTranslation()
  const { data, isLoading, error } = useSystemData()

  const isNetworkError =
    error &&
    (
      !error.response ||
      error.code === 'ERR_NETWORK' ||
      error.message === 'Network Error' ||
      error.message?.includes('timeout')
    )

  if (isNetworkError) {
    return (
      <AnimatedServerError
        message={t('dashboard.serverErrorMessage')}
      />
    )
  }

  return (
    <DashboardView
      data={data}
      isLoading={isLoading}
      t={t}
    />
  )
}

export default DashboardContainer
