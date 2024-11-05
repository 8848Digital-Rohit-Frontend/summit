import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executePOSTAPI } from '../../../utils/http-methods';
export const POSTCancelOrderAPI: any = async (appConfig: APP_CONFIG, apiBody: any, token?: any) => {
  const response = await executePOSTAPI(appConfig, 'cancel-order-api', apiBody, token);
  return response;
};
