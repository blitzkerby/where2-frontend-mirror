import React, { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import config from "./../config";

const useDiscussions = (pathname) => {
    const fetchDiscussions = async () => {
      let url = config.community.getDiscussions;
      
      // If not on the main discussions page, fetch discussions for the specific pathname
      if (pathname !== '/discussions') {
        url += `?pathname=${encodeURIComponent(pathname)}`;
      }
  
      try {
        const response = await axios.get(url);
        console.log('Fetched discussions:', response.data);
        
        // Check if response data structure matches expectations
        if (!response.data || !response.data.data || !response.data.data.discussions) {
          throw new Error('Invalid response structure');
        }
  
        return response.data.data.discussions; // Return the discussions directly
      } catch (err) {
        console.error('Error fetching discussions:', err);
        throw err;
      }
    };
  
    // Use useQuery with the new object-based API
    const { data, isLoading, isError, refetch } = useQuery({
      queryKey: ['discussions', pathname], // Key for the query
      queryFn: fetchDiscussions, // Function to fetch discussions
      enabled: !!pathname, // Only run the query if pathname is defined
    });
  
    return {
      discussions: data,
      loading: isLoading,
      error: isError,
      setDiscussions: (newData) => {
        refetch(); 
      },
      refetch,
    };
  };
  
  export default useDiscussions
