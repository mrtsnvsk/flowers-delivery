import axios from './axios';

export const getPromosListReq = async () => await axios.get('/stocks');
