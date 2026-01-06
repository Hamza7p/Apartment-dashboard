import { UserStatus } from '@/enums/UserStatus';
import { useUploadMedia } from '@/hooks/api/useMedia';
import { useUpdateProfile } from '@/hooks/api/useProfile';
import { useUpdateUser } from '@/hooks/api/useUsers';
import { USER_STATUS_MAP } from '@/utils/UserStatus.helper';
import { t } from 'i18next';
import React, { useState } from 'react'

const useUserInfo = ({user, isProfile, refetch}) => {

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

  const initializeFormData = {
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    username: user.username || '',
    phone: user.phone || '',
    date_of_birth: user.date_of_birth || '',
    role: user.role || '',
    status: user.status || UserStatus.pending,
    personal_photo_id: user.personal_photo?.id || null,
    id_photo_id: user.id_photo?.id || null,
  }
    
  const updateMutation = isProfile ? updateProfile : updateUser;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initializeFormData);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

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
  
  
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(initializeFormData);
  };
    
  const handleSave = () => {
    updateMutation.mutate(formData);
  };
    
  const handlePhotoUpload = (event, purpose) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert(t('users.invalidImageType') || 'Please select a valid image file');
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

  const statusInfo = USER_STATUS_MAP[user.status] || USER_STATUS_MAP[UserStatus.pending];
 
  

  
  return {
    updateMutation,
    isEditing,
    formData,
    uploadingPhoto,
    handleEdit,
    handleCancel,
    handleSave,
    handlePhotoUpload,
    statusInfo,
    handleFieldChange
  }
}

export default useUserInfo