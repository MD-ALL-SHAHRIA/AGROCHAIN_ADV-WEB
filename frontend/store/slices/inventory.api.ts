import { baseApi } from '@/config/reduxApiConfig';

export const inventoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createInventory: builder.mutation({
      query: (inventoryData) => ({
        url: '/inventory',
        method: 'POST',
        body: inventoryData,
      }),
      invalidatesTags: ['Inventory'],
    }),
    
    getMyInventories: builder.query({
      query: () => '/inventory/my-lots',
      providesTags: ['Inventory'],
    }),


    getAllInventories: builder.query({
      query: (params) => {
       
        const queryParams = new URLSearchParams();
        if (params?.search) queryParams.append('search', params.search);
        if (params?.cropType && params.cropType !== 'all') queryParams.append('cropType', params.cropType);
        
        return `/inventory?${queryParams.toString()}`;
      },
      providesTags: ['Inventory'],
    }),

    deleteInventory: builder.mutation({
      query: (id) => ({
        url: `/inventory/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Inventory'],
    }),

    getInventoryById: builder.query({
      query: (id) => `/inventory/${id}`,
      providesTags: ['Inventory'],
    }),

    updateInventory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/inventory/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Inventory'],
    }),
  }),
});

export const { 
  useCreateInventoryMutation, 
  useGetMyInventoriesQuery,
  useGetAllInventoriesQuery,      
  useDeleteInventoryMutation,
  useGetInventoryByIdQuery,
  useUpdateInventoryMutation
} = inventoryApi;