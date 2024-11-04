import { useState } from 'react';
import { POSTReplaceOrderAPI } from '../../services/api/order-apis/replace-order-api';
import { CONSTANTS } from '../../services/config/app-config';
import { toast } from 'react-toastify';
import UploadReviewPhotoAPI from '../../services/api/utils/upload-file-api';
import { useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';

function useReplaceOrder() {
  const defaultValues = {
    reason: '',
    qty: '',
    images: [],
  };

  const [formValues, setFormValues] = useState<any>(defaultValues);
  const [emptyFields, setEmptyFields] = useState<any>({});
  const TokenFromStore: any = useSelector(get_access_token);

  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };

  const handleChange = (e: any) => {
    const name = e.target.name;

    if (name === 'qty') {
      /^\d+$/.test(e.target.value) && setFormValues({ ...formValues, [name]: e.target.value });
      return;
    }

    setFormValues({ ...formValues, [name]: e.target.value });
    setEmptyFields({});
  };

  const handleImageChange = (e: any) => {
    const images = [e.target.files];

    images.map(async (item: any) => {
      const itemLength = Object.keys(item).length || 0;

      let imageData: any = [];

      for (let i = 0; i < itemLength; i++) {
        const handleUploadImgData = await UploadReviewPhotoAPI(item?.[i], TokenFromStore?.token);

        if (handleUploadImgData?.status === 200) {
          imageData = [...imageData, { image: handleUploadImgData?.data?.message?.file_url }];
        } else {
          toast.error(handleUploadImgData || 'Please upload another image');
        }
      }

      setFormValues({ ...formValues, images: [...formValues.images, ...imageData] });
    });
  };

  const handleSubmit = async (orderId: any, productId: any) => {
    let error: any = {};
    if (formValues?.reason === '') {
      error = { ...error, reason: '' };
    }
    if (formValues?.qty === '') {
      error = { ...error, qty: '' };
    }
    setEmptyFields({ ...error });

    if (!(error.qty || error.reason)) {
      const { SUMMIT_APP_CONFIG }: any = CONSTANTS;

      const data = {
        type: 'Replacement',
        reason: formValues.reason || '',
        order_id: orderId,
        product_id: productId,
        images: formValues.images,
        quantity: formValues.qty,
      };

      const replaceOrder = await POSTReplaceOrderAPI(SUMMIT_APP_CONFIG, data, TokenFromStore.token);

      if (replaceOrder.data.message.msg === 'success') {
        toast.success('Replacement Order Created Successfully!');
      } else {
        toast.error('Replacement Unsuccessfull');
      }
    }
  };

  return { handleChange, handleImageChange, handleSubmit, imageLoader, emptyFields, formValues };
}

export default useReplaceOrder;
