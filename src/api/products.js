import axios from './axios';

export const getProductsListReq = async (id, order, from = null, to = null) =>
  await axios.post(
    `/products/search?category_id=${id}&order_price=${order}${
      from ? `&price_from=${from}` : null
    }${to ? `&price_to=${to}` : null}`
  );

export const getProductByIdReq = async (id) =>
  await axios.get(`/products/get?product_id=${+id}`);

export const getSearchProductsListReq = async (term) =>
  await axios.get(
    `/products/search?search=${term ? term.toLowerCase() : null}`
  );

export const getProductsWithStocksReq = async () =>
  await axios.get('/products/stock');
