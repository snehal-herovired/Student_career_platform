import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useGetRequest = (url, delayTime = 200) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => {
      setIsLoading(false);
    }, delayTime);

    return () => clearTimeout(timer);
  }, [delayTime]);

  const query = useQuery(
    // No need to specify a custom query key here
  ['data'],
    () => axios.get(url).then((response) => response.data),
    {
      enabled: !isLoading, // Disable the query when isLoading is true, so it waits for the data to be fetched first
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    }
  );

  return {
    data: query.data,
    isError: query.isError,
    isLoading: isLoading || query.isLoading,
    refetch: query.refetch,
    isSuccess: query.isSuccess,
  };
};

export default useGetRequest;
