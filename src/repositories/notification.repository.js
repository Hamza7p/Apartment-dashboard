import { BaseRepository } from "./base.repository";
import { baseAxios } from "@/lib/axios";

/**
 * Notification Repository - Handles notification API calls
 */
export class NotificationRepository extends BaseRepository {
  constructor() {
    super("notifications");
  }

  /**
   * Get all notifications
   * @param {object} params - Query parameters (filters, orders, pagination)
   */
  async getAll(params = {}) {
    const response = await baseAxios.get(this.endpoint, {
      params,
    });
    return response.data;
  }

  /**
   * Get unread notifications count
   */
  async getUnreadCount() {
    const response = await baseAxios.get(`${this.endpoint}/unread-count`);
    return response.data;
  }

  /**
   * Mark all notifications as read
   */
  async markAllAsRead() {
    const response = await baseAxios.post(`${this.endpoint}/read`, {}, {
      showToast: false,
    });
    return response.data;
  }
}

export default NotificationRepository;

