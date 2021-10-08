import { registerUserReq } from '../../api/auth';
import { onDs } from './utils';

export const registerUser = (phone) => {
  return async (dispatch) => {
    try {
      const { data } = await registerUserReq(phone);

      // dispatch(onDs())
    } catch (e) {}
  };
};
