import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseUrl = process.env.REACT_APP_API_BASE_URL || process.env.VITE_API_BASE_URL || 'http://localhost:4000';


export const productsApi = createApi({
reducerPath: 'productsApi',
baseQuery: fetchBaseQuery({ baseUrl }),
tagTypes: ['Products'],
endpoints: (builder) => ({
getProducts: builder.query({
query: ({ page = 1, limit = 12, search = '', category = '' }) =>
`/products?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}`,
providesTags: (result) =>
result && result.items
? [
...result.items.map((id) => ({ type: 'Products', id })),
{ type: 'Products', id: 'LIST' },
]
: [{ type: 'Products', id: 'LIST' }],
}),
getProduct: builder.query({
query: (id) => `/products/${id}`,
providesTags: (result, error, id) => [{ type: 'Products', id }],
}),
createProduct: builder.mutation({
query: (body) => ({ url: '/products', method: 'POST', body }),
invalidatesTags: [{ type: 'Products', id: 'LIST' }],
}),
updateProduct: builder.mutation({
query: ({ id, ...patch }) => ({ url: `/products/${id}`, method: 'PUT', body: patch }),
invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }],
}),
deleteProduct: builder.mutation({
query: (id) => ({ url: `/products/${id}`, method: 'DELETE' }),
invalidatesTags: [{ type: 'Products', id: 'LIST' }],
}),
}),
});


export const {
useGetProductsQuery,
useGetProductQuery,
useCreateProductMutation,
useUpdateProductMutation,
useDeleteProductMutation,
} = productsApi;