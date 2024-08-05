import { callGetAPI } from '../../../utils/utils';
import { CONSTANTS } from '../../config/app-config';

const getOrderListAPI = async (token: any) => {
  const version = CONSTANTS.CUSTOM_API_SDK_VERSION;
  const method = 'get_list';
  const entity = 'order';
  const params = `?version=${version}&method=${method}&entity=${entity}`;
  const response: any = await callGetAPI(`${CONSTANTS.API_BASE_URL}${CONSTANTS.CUSTOM_API_SDK}${params}`, token);
  return response;
};

export default getOrderListAPI;
