import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  PhotoCamera as PhotoCameraIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useUser, useUpdateUser } from '@/hooks/api/useUsers';
import { useUpdateProfile } from '@/hooks/api/useProfile';
import { useUploadMedia } from '@/hooks/api/useMedia';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '@/store/auth/selectors';
import { UserStatus } from '@/enums/UserStatus';
import { USER_STATUS_MAP } from '@/utils/UserStatus.helper';
import { RoleName } from '@/enums/RoleName';

const UserInfo = ({ userId, isOwnProfile = false, allowRoleStatusEdit = false, useProfileUpdate = false }) => {
  const { t } = useTranslation();
  const currentUser = useSelector(selectUserInfo);
  const { data: userData, isLoading, error, refetch } = useUser(userId);
  
  const updateUser = useUpdateUser({
    onSuccess: () => {
      setIsEditing(false);
      refetch();
    },
  });
  
  const updateProfile = useUpdateProfile({
    onSuccess: () => {
      setIsEditing(false);
      refetch();
    },
  });
  
  const updateMutation = useProfileUpdate ? updateProfile : updateUser;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const user = userData?.data || userData || {};

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const uploadMedia = useUploadMedia({
    onSuccess: (data) => {
      const mediaId = data?.data?.id || data?.id;
      if (mediaId) {
        handleFieldChange('personal_photo_id', mediaId);
      }
    },
    onError: (error) => {
      console.error('Photo upload error:', error);
    },
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        username: user.username || '',
        phone: user.phone || '',
        date_of_birth: user.date_of_birth || '',
        role: user.role || '',
        status: user.status || UserStatus.pending,
        personal_photo_id: user.personal_photo?.id || null,
      });
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      username: user.username || '',
      phone: user.phone || '',
      date_of_birth: user.date_of_birth || '',
      role: user.role || '',
      status: user.status || UserStatus.pending,
      personal_photo_id: user.personal_photo?.id || null,
    });
  };

  const handleSave = () => {
    const updateData = { id: userId };
    
    if (isOwnProfile) {
      // Admin can update all fields except role and status for own profile
      updateData.first_name = formData.first_name;
      updateData.last_name = formData.last_name;
      updateData.username = formData.username;
      updateData.phone = formData.phone;
      updateData.date_of_birth = formData.date_of_birth;
      updateData.personal_photo_id = formData.personal_photo_id;
    } else if (allowRoleStatusEdit) {
      // Only allow role and status edit if explicitly allowed
      updateData.role = formData.role;
      updateData.status = formData.status;
    } else {
      // In user details page, allow editing all fields except role and status
      updateData.first_name = formData.first_name;
      updateData.last_name = formData.last_name;
      updateData.username = formData.username;
      updateData.phone = formData.phone;
      updateData.date_of_birth = formData.date_of_birth;
      updateData.personal_photo_id = formData.personal_photo_id;
    }

    updateMutation.mutate(updateData);
  };

  const handlePhotoUpload = (event, purpose) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert(t('users.invalidImageType') || 'Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(t('users.imageTooLarge') || 'Image size should be less than 5MB');
        return;
      }
      
      setUploadingPhoto(true);
      uploadMedia.mutate({file, purpose}, {
        onSettled: () => {
          setUploadingPhoto(false);
        },
      });
    }
  };

  const isAdmin = currentUser?.role === RoleName.admin;
  const canEdit = isAdmin && (isOwnProfile || !isOwnProfile);
  const statusInfo = USER_STATUS_MAP[user.status] || USER_STATUS_MAP[UserStatus.pending];

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
                  { console.log('url ', user.personal_photo?.url)}
                  <Avatar
                    src={user.personal_photo?.url || '/assets/images/user.png'}
                    alt={`${user.first_name} ${user.last_name}`}
                    sx={{
                      width: 180,
                      height: 180,
                      border: '4px solid',
                      borderColor: 'primary.main',
                      boxShadow: 4,
                    }}
                  />
                  {isEditing && (isOwnProfile || !isOwnProfile) && (
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
                  label={statusInfo.label}
                  color={statusInfo.color}
                  variant="filled"
                  sx={{ fontWeight: 600 }}
                />
              </Box>
            </Grid>

            {/* Details Section */}
            <Grid item xs={12} md={8}>
              <Stack spacing={3}>
                {/* Action Buttons */}
                {canEdit && (
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    {!isEditing ? (
                      <Button
                        variant="contained"
                        startIcon={<EditIcon />}
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
                )}

                {/* Form Fields */}
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('users.first_name')}
                      value={formData.first_name || ''}
                      onChange={(e) => handleFieldChange('first_name', e.target.value)}
                      disabled={!isEditing}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('users.last_name')}
                      value={formData.last_name || ''}
                      onChange={(e) => handleFieldChange('last_name', e.target.value)}
                      disabled={!isEditing}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('users.username')}
                      value={formData.username || ''}
                      onChange={(e) => handleFieldChange('username', e.target.value)}
                      disabled={!isEditing}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('users.phone')}
                      value={formData.phone || ''}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      disabled={!isEditing}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('users.date_of_birth')}
                      type="date"
                      value={formData.date_of_birth || ''}
                      onChange={(e) => handleFieldChange('date_of_birth', e.target.value)}
                      disabled={!isEditing}
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  {allowRoleStatusEdit && !isOwnProfile && isEditing && (
                    <>
                      <Grid item xs={12} sm={6}>
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
                      <Grid item xs={12} sm={6}>
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
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          {t('users.role')}
                        </Typography>
                        <Chip
                          label={user.role === RoleName.admin ? t('users.admin') : t('users.user')}
                          color={user.role === RoleName.admin ? 'primary' : 'default'}
                          variant="outlined"
                          size="small"
                          sx={{ mt: 0.5 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
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
      </Card>
    </Box>
  );
};

export default UserInfo;
