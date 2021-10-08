import axios from './axios';

export const registerUserReq = async () => {
  return await axios.post('/users/register');
};
