import axios from './axios';

export const getProductsListReq = async (id, order, from, to) => {
  return await axios.post(
    `/products/search?category_id=${id}&order_price=${order}${
      from >= 0 ? `&price_from=${from}` : null
    }${to > 0 ? `&price_to=${to}` : null}`
  );
};

export const getProductByIdReq = async (id) =>
  await axios.get(`/products/get?product_id=${+id}`);

export const getSearchProductsListReq = async (term, category) => {
  const queryURI = `/products/search?${
    term ? 'search=' + term.toLowerCase() + '&' : ''
  }${category ? `category_id=${category}` : ''}
  `;

  return await axios.get(queryURI);
};

export const getProductsWithStocksReq = async () =>
  await axios.get('/products/stock');

export const getRecommendationsProductsReq = async () =>
  await axios.get('/products/recomendation');

export const getAdditItemsForProductReq = async () =>
  await axios.get('/products/additional');
