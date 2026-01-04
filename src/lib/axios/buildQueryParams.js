/**
 * Utility to build query parameters with filters, orders, and pagination
 * 
 * @param {object} options - Query options
 * @param {array} options.filters - Array of filter objects: [{name: 'column', operation: 'eq', value: 'value'}]
 * @param {array} options.orders - Array of order objects: [{name: 'column', direction: 'asc'|'desc'}]
 * @param {number} options.page - Page number
 * @param {number} options.perPage - Items per page
 * @param {object} options.otherParams - Other query parameters
 * 
 * @returns {object} - Formatted query parameters
 */
export const buildQueryParams = ({
  filters = [],
  orders = [],
  page,
  perPage,
  keyword,
  ...otherParams
} = {}) => {
  const params = { ...otherParams };

  // Add filters
  filters.forEach((filter, index) => {
    if (filter.name && filter.operation && filter.value !== undefined) {
      params[`filters[${index}][name]`] = filter.name;
      params[`filters[${index}][operation]`] = filter.operation;
      params[`filters[${index}][value]`] = filter.value;
    }
  });

  // Add orders
  orders.forEach((order, index) => {
    if (order.name && order.direction) {
      params[`orders[${index}][name]`] = order.name;
      params[`orders[${index}][direction]`] = order.direction;
    }
  });

  // Add pagination
  if (page !== undefined) {
    params.page = page;
  }
  if (perPage !== undefined) {
    params.perPage = perPage;
  }

  // Add keyword search
  if (keyword) {
    params.keyword = keyword;
  }

  return params;
};

export default buildQueryParams;

