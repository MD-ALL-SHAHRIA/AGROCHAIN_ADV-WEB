import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
    prepareHeaders: (headers, { getState }) => {
      
      let token = (getState() as any).auth?.token;

     
      if (!token && typeof window !== 'undefined') {
        token = localStorage.getItem('token');
      }

     
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  tagTypes: ['User', 'Inventory', 'Order', 'Fraud', 'Dispute'],
  endpoints: () => ({}),
});