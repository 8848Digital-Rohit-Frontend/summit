import { useEffect } from 'react';
import { ServerDataTypes } from '../../../../interfaces/meta-data-interface';
import { CONSTANTS } from '../../../../services/config/app-config';
import getPageMetaData from '../../../../utils/fetch-page-meta-deta';
import useInitializeStoreWithMultiLingualData from '../../../../hooks/GeneralHooks/useInitializeStoreWithMultiLingualData';
import useGoogleAnalyticsOperationsHandler from '../../../../hooks/GoogleAnalytics/useGoogleAnalyticsOperationsHandler';
import PageMetaData from '../../../../components/PageMetaData';
import ProductPageMaster from '../../../../components/ProductPageComponents/ProductPageMaster';

const Index = ({ serverDataForPages }: ServerDataTypes) => {
  const { sendPageViewToGA } = useGoogleAnalyticsOperationsHandler();
  useInitializeStoreWithMultiLingualData(serverDataForPages?.multiLingualListTranslationTextList);
  useEffect(() => {
    sendPageViewToGA(window.location.pathname + window.location.search, 'Product Detail Page');
  }, []);
  return (
    <>
      {CONSTANTS.ENABLE_META_TAGS && <PageMetaData meta_data={serverDataForPages.metaData} />}
      <ProductPageMaster />
    </>
  );
};

export async function getServerSideProps(context: any) {
  const { SUMMIT_APP_CONFIG } = CONSTANTS;
  const method = 'get_meta_tags';
  const version = SUMMIT_APP_CONFIG.version;
  const entity = 'seo';
  const params = `?version=${version}&method=${method}&entity=${entity}`;
  const url = `${context.resolvedUrl.split('?')[0]}`;
  if (CONSTANTS.ENABLE_META_TAGS) {
    return await getPageMetaData(params, url);
  } else {
    return {
      props: {},
    };
  }
}
export default Index;
