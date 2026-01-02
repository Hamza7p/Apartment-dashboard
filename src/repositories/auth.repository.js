import { BaseRepository } from "./base.repository";
import { baseAxios } from "@/lib/axios";

/**
 * Auth Repository - Handles authentication API calls
 */
export class AuthRepository extends BaseRepository {
  constructor() {
    super("auth"); // endpoint: /auth
  }

  /**
   * Login with phone and password
   * @param {string} phone - User phone number
   * @param {string} password - User password
   */
  async login(phone, password) {
    const response = await baseAxios.post(`${this.endpoint}/login`, {
      phone,
      password,
    }, {
      showToast: false, // We'll handle toast in the component
    });
    return response.data;
  }

  /**
   * Send OTP to phone number
   * @param {string} phone - Phone number
   */
  async sendOTP(phone) {
    const response = await baseAxios.post(
      `${this.endpoint}/send-otp`,
      { phone },
      {
        showToast: false,
      }
    );
    return response.data;
  }

  /**
   * Verify OTP code
   * @param {string} phone - Phone number
   * @param {string} otp - OTP code
   */
  async verifyOTP(phone, otp) {
    const response = await baseAxios.post(
      `${this.endpoint}/verify-otp`,
      { phone, otp },
      {
        showToast: false,
      }
    );
    return response.data;
  }

  /**
   * Reset password after OTP verification
   * @param {string} phone - Phone number
   * @param {string} password - New password
   * @param {string} confirmation_password - Password confirmation
   */
  async resetPassword(phone, password, confirmation_password) {
    const response = await baseAxios.post(
      `${this.endpoint}/reset-password`,
      { phone, password, confirmation_password },
      {
        showToast: false,
      }
    );
    return response.data;
  }
}

export default AuthRepository;


