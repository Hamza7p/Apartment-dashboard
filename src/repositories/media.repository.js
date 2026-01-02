import { baseAxios } from "@/lib/axios";

/**
 * Media Repository - Handles media upload API calls
 */
export class MediaRepository {
  /**
   * Upload media file
   * @param {File} file - File to upload
   * @param {object} config - Additional axios config
   */
  async upload(file, config = {}) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await baseAxios.post("media", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...config,
    });
    return response.data;
  }

  /**
   * Get media list
   * @param {object} params - Query parameters
   */
  async getAll(params = {}) {
    const response = await baseAxios.get("media", {
      params,
    });
    return response.data;
  }
}

export default MediaRepository;

