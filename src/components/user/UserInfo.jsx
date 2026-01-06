import {
  Box,
  Grid,
  Typography,
  Avatar,
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  PhotoCamera as PhotoCameraIcon,
  Image,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
// import { useUpdateUser } from '@/hooks/api/useUsers';
// import { useUpdateProfile } from '@/hooks/api/useProfile';
// import { useUploadMedia } from '@/hooks/api/useMedia';
import { UserStatus } from '@/enums/UserStatus';
// import { USER_STATUS_MAP } from '@/utils/UserStatus.helper';
import { RoleName } from '@/enums/RoleName';
import useUserInfo from './useUserInfo.jsx';

const UserInfo = ({ userData, isProfile, isLoading, error, refetch }) => {
  const { t } = useTranslation();
  const user = userData?.data || userData || {};
  const { 
    updateMutation,
    isEditing,
    formData,
    uploadingPhoto,
    handleEdit,
    handleCancel,
    handleSave,
    handlePhotoUpload,
    statusInfo,
    handleFieldChange,
    photoUrl
  } = useUserInfo({user, isProfile, refetch});

  let canEdit = isProfile;

   
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
        <CircularProgress />
      </Box>
    );
  }
  
  const isNetworkError =
    error &&
    (!error.response ||
      error.code === "ERR_NETWORK" ||
      error.message === "Network Error" ||
      error.message?.includes("timeout"));
  
  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {isNetworkError
          ? t("users.networkError") || "Network error. Please check your connection."
          : error?.response?.data?.message ||
            error?.message ||
            t("users.errorLoadingUser") ||
            "Error loading user"}
      </Alert>
    );
    }

  return (
    <Box>
      <Card
        elevation={3}
        sx={{
          borderRadius: 3,
          overflow: 'hidden'
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={4}>
            {/* Photo Section */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    src={photoUrl.personal_photo || '/assets/images/user.png'}
                    alt={`${user.first_name} ${user.last_name}`}
                    sx={{
                      width: 180,
                      height: 180,
                      border: '4px solid',
                      borderColor: 'primary.main',
                      boxShadow: 4,
                    }}
                  />
                  {isEditing && canEdit && (
                    <IconButton
                      component="label"
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': { bgcolor: 'primary.dark' },
                      }}
                      disabled={uploadingPhoto}
                    >
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handlePhotoUpload(e, 'personal-photo')}
                      />
                      {uploadingPhoto ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <PhotoCameraIcon />
                      )}
                    </IconButton>
                  )}
                </Box>
                <Typography variant="h5" fontWeight={600}>
                  {user.first_name} {user.last_name}
                </Typography>
                <Chip
                  icon={statusInfo.icon}
                  label={t(`users.${statusInfo.label}`)}
                  color={statusInfo.color}
                  variant="filled"
                  sx={{ fontWeight: 600 , p: 1}}
                />
              </Box>
            </Grid>

            {/* Details Section */}
            <Grid item xs={12} md={8}>
              <Stack spacing={3}>
                {/* Action Buttons */}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    {!isEditing ? (
                      <Button
                        variant="contained"
                        startIcon={<EditIcon sx={{  ml: 1 }} />}
                        onClick={handleEdit}
                      >
                        {t('users.edit')}
                      </Button>
                    ) : (
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="outlined"
                          startIcon={<CancelIcon />}
                          onClick={handleCancel}
                          disabled={updateMutation.isPending}
                        >
                          {t('common.cancel')}
                        </Button>
                        <Button
                          variant="contained"
                          startIcon={<SaveIcon />}
                          onClick={handleSave}
                          disabled={updateMutation.isPending}
                        >
                          {updateMutation.isPending ? (
                            <CircularProgress size={20} />
                          ) : (
                            t('common.save')
                          )}
                        </Button>
                      </Stack>
                    )}
                  </Box>

                {/* Form Fields */}
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}  sx={{ minWidth: '31%'}}>
                    <TextField
                      fullWidth
                      label={t('users.first_name')}
                      value={formData.first_name || ''}
                      onChange={(e) => handleFieldChange('first_name', e.target.value)}
                      disabled={(!isEditing || !canEdit)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ minWidth: '31%'}}>
                    <TextField
                      fullWidth
                      label={t('users.last_name')}
                      value={formData.last_name || ''}
                      onChange={(e) => handleFieldChange('last_name', e.target.value)}
                      disabled={!isEditing || !canEdit}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ minWidth: '31%'}}>
                    <TextField
                      fullWidth
                      label={t('users.username')}
                      value={formData.username || ''}
                      onChange={(e) => handleFieldChange('username', e.target.value)}
                      disabled={!isEditing || !canEdit}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ minWidth: '31%'}}>
                    <TextField
                      fullWidth
                      label={t('users.phone')}
                      value={formData.phone || ''}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      disabled={!isEditing || !canEdit}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ minWidth: '31%'}}>
                    <TextField
                      fullWidth
                      label={t('users.date_of_birth')}
                      type="date"
                      value={formData.date_of_birth || ''}
                      onChange={(e) => handleFieldChange('date_of_birth', e.target.value)}
                      disabled={!isEditing || !canEdit}
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  { !isProfile && isEditing && (
                    <>
                      <Grid item xs={12} sm={6} sx={{ minWidth: '31%'}}>
                        <FormControl fullWidth>
                          <InputLabel>{t('users.role')}</InputLabel>
                          <Select
                            value={formData.role || ''}
                            onChange={(e) => handleFieldChange('role', e.target.value)}
                            label={t('users.role')}
                          >
                            <MenuItem value={RoleName.admin}>{t('users.admin')}</MenuItem>
                            <MenuItem value={RoleName.user}>{t('users.user')}</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} sx={{ minWidth: '31%'}}>
                        <FormControl fullWidth>
                          <InputLabel>{t('users.status')}</InputLabel>
                          <Select
                            value={formData.status || UserStatus.pending}
                            onChange={(e) => handleFieldChange('status', e.target.value)}
                            label={t('users.status')}
                          >
                            <MenuItem value={UserStatus.approved}>
                              {t('users.approved')}
                            </MenuItem>
                            <MenuItem value={UserStatus.pending}>
                              {t('users.pending')}
                            </MenuItem>
                            <MenuItem value={UserStatus.rejected}>
                              {t('users.rejected')}
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </>
                  )}
                  {!isEditing && (
                    <>
                      <Grid item xs={12} sm={6} sx={{ minWidth: '31%'}}>
                        <Typography variant="body2" color="text.secondary">
                          {t('users.role')}
                        </Typography>
                        <Chip
                          label={user.role === RoleName.admin ? t('users.admin') : t('users.user')}
                          color={user.role === RoleName.admin ? 'secondary' : 'default'}
                          variant="outlined"
                          size="small"
                          sx={{ mt: 0.5 , p: 2, width: '30%'}}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} sx={{ minWidth: '31%'}}>
                        <Typography variant="body2" color="text.secondary">
                          {t('users.verified_at')}
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {user.verified_at
                            ? new Date(user.verified_at).toLocaleDateString()
                            : '-'}
                        </Typography>
                      </Grid>
                    </>
                  )}
                </Grid>

                {updateMutation.isError && (
                  <Alert severity="error">
                    {updateMutation.error?.code === "ERR_NETWORK" ||
                    updateMutation.error?.message === "Network Error"
                      ? t("users.networkError") || "Network error. Please check your connection."
                      : updateMutation.error?.response?.data?.message ||
                        updateMutation.error?.message ||
                        t("users.errorUpdatingUser") ||
                        "Error updating user"}
                  </Alert>
                )}
              </Stack>
            </Grid>
        </Grid>
        </CardContent>

        {/* identity photo section  */}
        <CardContent
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            p: 3,
            my: 3,
          }}
        >
          <Typography variant="h6" fontWeight={600} gutterBottom>
            {t('users.identity_photo')}
          </Typography>

          <Box
            sx={{
              width: 220,
              height: 140, 
              border: '1px solid',
              borderColor: isEditing ? 'primary.main' : 'divider',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {photoUrl.id_photo ? (
              <img
                src={photoUrl.id_photo}
                alt={`${user.first_name} ${user.last_name}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Image sx={{ fontSize: 48, color: 'text.disabled' }} />
            )}
            {/* edit id photo  */}
             {isEditing && canEdit && (
                <IconButton
                  component="label"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' },
                  }}
                      disabled={uploadingPhoto}
                    >
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handlePhotoUpload(e, 'id-photo')}
                      />
                      {uploadingPhoto ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <PhotoCameraIcon />
                      )}
                    </IconButton>
                  )}
          </Box>
        </CardContent>

      </Card>
    </Box>
  );
};

export default UserInfo;
