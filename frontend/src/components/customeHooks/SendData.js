import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import {axiosInstance} from '../../connection';
const usePostRequest = (url) => {
  // Get the token from localStorage
  const token = localStorage.getItem('token');

  // Set the Authorization header for Axios requests
  const postRequest = async (data) => {
    const response = await axiosInstance.post(url, data);
    return response.data;
  };

  return useMutation(postRequest);
};

export default usePostRequest;
