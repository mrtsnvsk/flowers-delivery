import axios from './axios';

export const getCategoriesListReq = async () => {
  return await axios.get('/categorys');
};
