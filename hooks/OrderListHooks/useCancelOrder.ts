import { CONSTANTS } from '../../services/config/app-config';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import useFetchOrderListHook from './useFetchOrderListHook';
import { POSTCancelOrderAPI } from '../../services/api/order-apis/cancel-order-api';
function useCancelOrder() {
  const TokenFromStore: any = useSelector(get_access_token);
  const { setIsLoading, setErrMessage }: any = useHandleStateUpdate();
  const { fetchOrderListingDataFun }: any = useFetchOrderListHook();
  const handleCancel = async (data: any) => {
    const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
    const info = {
      order_id: data?.name,
    };
    const cancelOrder = await POSTCancelOrderAPI(SUMMIT_APP_CONFIG, info, TokenFromStore.token);
    // console.log(cancelOrder);
    if (cancelOrder.data.message.msg === 'success') {
      toast.success('Order Cancelled Successfully!');
      fetchOrderListingDataFun(setErrMessage, setIsLoading);
    } else {
      toast.error('Cancelation Unsuccessfull');
    }
  };
  return { handleCancel };
}
export default useCancelOrder;
