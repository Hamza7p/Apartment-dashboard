import { baseAxios } from "@/lib/axios";

/**
 * System Repository - Handles system data API calls
 */
export class SystemRepository {
  /**
   * Get system data (dashboard stats)
   */
  async getSystemData() {
    const response = await baseAxios.get("system-data");
    return response.data;
  }
}

export default SystemRepository;

