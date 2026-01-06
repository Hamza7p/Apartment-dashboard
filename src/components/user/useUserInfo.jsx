import { UserStatus } from '@/enums/UserStatus';
import { useUploadMedia } from '@/hooks/api/useMedia';
import { useUpdateProfile } from '@/hooks/api/useProfile';
import { useUpdateUser } from '@/hooks/api/useUsers';
import { USER_STATUS_MAP } from '@/utils/UserStatus.helper';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react'

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
    id: user.id || '',
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    username: user.username || '',
    phone: user.phone || '',
    date_of_birth: user.date_of_birth || '',
    role: user.role || '',
    status: user.status || UserStatus.pending,
    personal_photo: user.personal_photo?.id || null,
    id_photo: user.id_photo?.id || null,
  }
    
  const updateMutation = isProfile ? updateProfile : updateUser;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoUrl, setPhotoUrl] = useState({
    personal_photo: null,
    id_photo: null,
  });

  useEffect(() => {
    if (user) {
      setFormData(initializeFormData);
      setPhotoUrl({
          personal_photo: user.personal_photo?.url || null,
          id_photo: user.id_photo?.url || null,
        });
    }
  }, [user])

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const uploadMedia = useUploadMedia({
    onSuccess: (data) => {
      const mediaId = data?.id;
      const purpose = data?.for === 'personal-photo' ? 'personal_photo' : 'id_photo';
      if (mediaId && purpose) {
        handleFieldChange(purpose, mediaId);
        setPhotoUrl((prev) => ({ ...prev, [purpose]: data?.url }));
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
    handleFieldChange,
    photoUrl
  }
}

export default useUserInfo