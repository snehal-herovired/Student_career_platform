import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {axiosInstance} from '../../connection';
const useGetRequest = (url) => {
    const getRequest = async () => {
      const response = await axiosInstance.get(url);
      return response.data;
    };
  
    return useQuery(["batch"],getRequest);
  };
  
  export default useGetRequest;
  