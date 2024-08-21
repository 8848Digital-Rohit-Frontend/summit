import { executeGETAPI } from '../../../utils/http-methods';
import APP_CONFIG from '../../../interfaces/app-config-interface';

export const getMultiCurrencyValue = async (appConfig: APP_CONFIG) => {
  const additionalParams = {}; // Add additional parameters if needed
  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(
    appConfig,
    'default-currency-api',
    undefined,
    additionalParams // Pass additional parameters if needed
  );

  return response;
};