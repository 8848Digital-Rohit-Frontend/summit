import { CONSTANTS } from '../../config/app-config';
import { callGetAPI, executeGETAPI } from '../../../utils/http-methods';
import APP_CONFIG from '../../../interfaces/app-config-interface';

const fetchCartListingAPI = async (appConfig: APP_CONFIG, token: any) => {
  const additionalParams = {}; // Add additional parameters if needed
  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(
    appConfig,
    'get-cart-list-items-api',
    token,
    additionalParams // Pass additional parameters if needed
  );

  return response;
};

export default fetchCartListingAPI;