import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useGetRequest = (url) => {
    const getRequest = async () => {
      const response = await axios.get(url);
      return response.data;
    };
  
    return useQuery(["batch"],getRequest);
  };
  
  export default useGetRequest;
  