import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import { fetchOrderListingDataFun, handleOrderCancel, handleFilter, handleQuery, handleSelect } from './orderlListFunctions';

const useOrderListHook = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const { query }: any = useRouter();
  const router = useRouter();
  const tokenFromStore: any = useSelector(get_access_token);
  const [orderListData, setOrderListData] = useState<any>([]);
  const [filterDate, setFilterDate] = useState(query?.date_range || 'this_month');

  const handleUpdateQuery = (orderStatus: string, dateRange: string) => handleQuery(orderStatus, dateRange, router, query);
  const handleCancel = (data: any) => handleOrderCancel(data, setErrMessage, setIsLoading, setOrderListData, tokenFromStore, query);
  const handleTabSelect = (key: any) => handleSelect(key, handleUpdateQuery, filterDate);
  const handleFilterDate = (e: any) => {
    handleFilter(e, setFilterDate);
    handleUpdateQuery(query?.status || 'completed-orders', e.target.value);
  };

  useEffect(() => {
    if (query?.status) {
      fetchOrderListingDataFun(setErrMessage, setIsLoading, setOrderListData, tokenFromStore, query);
    }
  }, [query]);

  return { orderListData, handleCancel, isLoading, errorMessage, filterDate, handleFilterDate, handleTabSelect };
};

export default useOrderListHook;
