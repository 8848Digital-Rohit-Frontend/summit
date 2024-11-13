import getOrderListAPI from '../../services/api/order-apis/order-list-api';
import { CONSTANTS } from '../../services/config/app-config';
import { toast } from 'react-toastify';
import { POSTCancelOrderAPI } from '../../services/api/order-apis/cancel-order-api';

const { SUMMIT_APP_CONFIG }: any = CONSTANTS;

export const fetchOrderListingDataFun: any = async (
  setErrMessage: any,
  setIsLoading: any,
  setOrderListData: any,
  tokenFromStore: any,
  query: any
) => {
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

export const handleOrderCancel = async (
  data: any,
  setErrMessage: any,
  setIsLoading: any,
  setOrderListData: any,
  tokenFromStore: any,
  query: any
) => {
  const info = {
    order_id: data?.name,
  };
  const cancelOrder = await POSTCancelOrderAPI(SUMMIT_APP_CONFIG, info, tokenFromStore.token);
  // console.log(cancelOrder);
  if (cancelOrder.data.message.msg === 'success') {
    toast.success('Order Cancelled Successfully!');
    fetchOrderListingDataFun(setErrMessage, setIsLoading, setOrderListData, tokenFromStore, query);
  } else {
    toast.error('Cancelation Unsuccessfull');
  }
};

export const handleQuery = (orderStatus: string, dateRange: string, router: any, query: any) => {
  router.push({
    query: { ...query, status: orderStatus, date_range: dateRange },
  });
};

export const handleFilter = (e: any, setFilterDate: any) => {
  setFilterDate(e.target.value);
};

export const handleSelect = (key: any, handleUpdateQuery: any, filterDate: any) => {
  if (key === '1') {
    handleUpdateQuery('completed-orders', filterDate);
  } else if (key === '2') {
    handleUpdateQuery('cancelled-orders', filterDate);
  }
};
