import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
const usePostRequest = (url) => {
  const postRequest = async (data) => {
    const response = await axios.post(url, data);
    return response.data;
  };

  return useMutation(postRequest);
};

export default usePostRequest;
