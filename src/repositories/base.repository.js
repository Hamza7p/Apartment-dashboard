import { baseAxios } from "@/lib/axios";

/**
 * Base Repository class implementing CRUD operations
 * Follows Repository Pattern to centralize API calls
 */
export class BaseRepository {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  /**
   * GET - Fetch all items
   * @param {object} params - Query parameters
   * @param {object} config - Axios config
   */
  async getAll(params = {}, config = {}) {
    const response = await baseAxios.get(this.endpoint, {
      params,
      ...config,
    });
    return response.data;
  }

  /**
   * GET - Fetch single item by ID
   * @param {string|number} id - Item ID
   * @param {object} config - Axios config
   */
  async getById(id, config = {}) {
    const response = await baseAxios.get(`${this.endpoint}/${id}`, config);
    return response.data;
  }

  /**
   * POST - Create new item
   * @param {object} data - Item data
   * @param {object} config - Axios config
   */
  async create(data, config = {}) {
    const response = await baseAxios.post(this.endpoint, data, config);
    return response.data;
  }

  /**
   * PUT - Update entire item
   * @param {string|number} id - Item ID
   * @param {object} data - Updated data
   * @param {object} config - Axios config
   */
  async update(id, data, config = {}) {
    const response = await baseAxios.put(
      `${this.endpoint}/${id}`,
      data,
      config
    );
    return response.data;
  }

  /**
   * PATCH - Partial update
   * @param {string|number} id - Item ID
   * @param {object} data - Partial data
   * @param {object} config - Axios config
   */
  async patch(id, data, config = {}) {
    const response = await baseAxios.patch(
      `${this.endpoint}/${id}`,
      data,
      config
    );
    return response.data;
  }

  /**
   * DELETE - Remove item
   * @param {string|number} id - Item ID
   * @param {object} config - Axios config
   */
  async delete(id, config = {}) {
    const response = await baseAxios.delete(`${this.endpoint}/${id}`, config);
    return response.data;
  }
}

export default BaseRepository;

