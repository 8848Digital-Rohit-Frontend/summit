import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import useFetchOrderListHook from './useFetchOrderListHook';

const useOrderListHook = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const { query }: any = useRouter();
  const router = useRouter();
  const { orderListData, fetchOrderListingDataFun }:any = useFetchOrderListHook();
  const [history, setHistory] = useState(query?.date_range || 'this_month');
  const handleHistoryDate = (e: any) => {
    setHistory(e.target.value);
  };
  const handleUpdateQuery = (orderStatus: string, dateRange: string) => {
    router.push({
      query: { ...query, status: orderStatus, date_range: dateRange },
    });
  };

  useEffect(() => {
    if (query?.status) {
      fetchOrderListingDataFun(setErrMessage, setIsLoading);
    }
  }, [query]);
  useEffect(() => {
    handleUpdateQuery(query?.status || 'completed-orders', query?.data_range || history);
  }, [history]);

  return { orderListData, isLoading, errorMessage, history, handleHistoryDate, handleUpdateQuery };
};

export default useOrderListHook;
