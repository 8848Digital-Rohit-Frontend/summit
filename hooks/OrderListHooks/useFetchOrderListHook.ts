import { useSelector } from 'react-redux';
import getOrderListAPI from '../../services/api/order-apis/order-list-api';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { useRouter } from 'next/router';
import { useState } from 'react';

const useFetchOrderListHook = () => {
  const [orderListData, setOrderListData] = useState<any>([]);

  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const tokenFromStore: any = useSelector(get_access_token);
  const { query }: any = useRouter();
  
  const fetchOrderListingDataFun: any = async (setErrMessage: any, setIsLoading: any) => {
    let getOrderListingData: any;
    setIsLoading(true);
    const updateStatus: any = (query: any) => {
      if (query === 'completed-orders') {
        return 'Completed';
      } else if (query === 'cancelled-orders') {
        return 'Cancelled';
      } else if (query === 'replaced-orders') {
        return 'Replacement';
      } else {
        return '';
      }
    };

    const filterStatus = {
      status: updateStatus(query?.status) || '',
      date_range: query?.date_range || '',
    };
    /**
     * Fetches order listing data from the API using the given token and status.
     *
     * @async
     * @function getOrderListAPI
     * @param {Object} SUMMIT_APP_CONFIG - The Summit API SDK object used to interact with the API.
     * @param {string} token - The authentication token obtained from the store.
     * @param {string} status - The order status to filter the listing data. Could be any of 3 values 1. Completed 2.Cancelled or 3. ''.
     * @returns {Promise<void>} - Resolves when the API response is handled.
     * @throws {Error} Throws an error if the API call fails.
     */
    try {
      getOrderListingData = await getOrderListAPI(SUMMIT_APP_CONFIG, filterStatus, tokenFromStore.token);
      if (getOrderListingData?.status === 200 && getOrderListingData?.data?.message?.msg === 'success') {
        setOrderListData(getOrderListingData?.data?.message?.data);
      } else {
        setErrMessage(getOrderListingData?.data?.message?.error);
      }
    } catch (error) {
      setErrMessage(getOrderListingData?.data?.message?.error);
    } finally {
      setIsLoading(false);
    }
  };

  return { orderListData, fetchOrderListingDataFun };
};

export default useFetchOrderListHook;
