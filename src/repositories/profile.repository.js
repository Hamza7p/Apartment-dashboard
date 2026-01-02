import { baseAxios } from "@/lib/axios";

/**
 * Profile Repository - Handles profile API calls
 */
export class ProfileRepository {
  /**
   * Get current user profile
   */
  async getMe() {
    const response = await baseAxios.get("auth/me");
    return response.data;
  }

  /**
   * Update user profile
   * @param {object} data - Profile data to update
   */
  async updateProfile(data) {
    const response = await baseAxios.post("auth/update-profile", data, {
      showToast: false,
    });
    return response.data;
  }
}

export default ProfileRepository;

