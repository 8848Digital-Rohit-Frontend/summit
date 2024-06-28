export const CONSTANTS = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  API_MANDATE_PARAMS: '/api/method/summitapp.sdk.api',
  VERSION: 'v2',
  ENABLE_META_TAGS: true,
  ENABLE_QUICK_ORDER: false,
  ENABLE_APPLY_COUPON_CODE: true,
  ENABLE_STORE_CREDIT: true,
  ENABLE_REDIRECT_FEATURE: false,
  ENABLE_PRODUCT_ENQUIRY_FEATURE: false,
  USE_SINGLE_ENQUIRY: false,
  DOES_PRODUCT_HAS_VARIANTS: false,
  // "SHOW_MORE_ITEMS" IS A KEY WHOSE VALUE DECIDES WHETHER TO SHOW LOAD MORE BUTTON OR PAGINATION.
  // IT WILL CONTAIN TWO VALUES "paginate" or "load-more"
  SHOW_MORE_ITEMS: 'paginate',
  ENABLE_MISSING_PARTS: true,
  SHOW_FUTURE_STOCK_AVAILABILITY_TO_GUEST: false,
  SHOW_FUTURE_STOCK_AVAILABILITY: false,
  ADD_TO_CART_FOR_GUEST: true,
  SHOW_TRANSPORTERS_LIST_TO_DEALER: true,
  ALLOW_REQUEST_QUOTATION: true,
  ENABLE_SEARCH_TEXT: false,
  ENABLE_PAYMENT_INTEGRATION: false,
  DEFAULT_CURRENCY_VALUE: 'rupee',
  DEFAULT_LANGUAGE: 'en',
  ENABLE_SHOP_ON_AMAZON: false,
};
