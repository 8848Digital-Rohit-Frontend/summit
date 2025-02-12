import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executeGETAPI } from '../../../utils/http-methods';

/**
 * Fetches Order History data from the API using the given parameters.
 *
 * @async
 * @function getOrderListAPI
 * @param {string} appConfig - The configuration of the application.
 * @param {string} token - The authentication token.
 * @param {string} [status] - Optional status filter for the order listing.
 * @returns {Promise<any>} - The response from the API call.
 * @throws {Error} Throws an error if the API call fails.
 */
const getOrderListAPI = async (appConfig: APP_CONFIG, status: any, token: any): Promise<any> => {
  const user = localStorage.getItem('user') || '';
  let additionalParams = { user, ...(status && status) };
  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(
    appConfig,
    'order-list-api',
    token,
    additionalParams // Pass additional parameters if needed
  );

  return response;
};

export default getOrderListAPI;
