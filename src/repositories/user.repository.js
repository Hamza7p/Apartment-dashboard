import { BaseRepository } from "./base.repository";
import { baseAxios } from "@/lib/axios";

/**
 * User Repository - Extends BaseRepository with user-specific methods
 */
export class UserRepository extends BaseRepository {
  constructor() {
    super("users"); // endpoint: /users
  }

  /**
   * Custom method: Get user profile
   */
  async getProfile() {
    return this.getById("profile");
  }

  /**
   * Custom method: Update user profile
   */
  async updateProfile(data) {
    return this.update("profile", data);
  }

  /**
   * Custom method: Change user password
   */
  async changePassword(currentPassword, newPassword) {
    const response = await this.create({
      currentPassword,
      newPassword,
      endpoint: `${this.endpoint}/change-password`,
    });
    return response;
  }
}

export default UserRepository;

