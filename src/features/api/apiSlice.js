import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const flattenObj = (data) => {
  const isObject = (data) =>
    Object.prototype.toString.call(data) === "[object Object]";
  const isArray = (data) =>
    Object.prototype.toString.call(data) === "[object Array]";

  const flatten = (data) => {
    if (!data.attributes) return data;

    return {
      id: data.id,
      ...data.attributes,
    };
  };

  if (isArray(data)) {
    return data.map((item) => flattenObj(item));
  }

  if (isObject(data)) {
    if (isArray(data.data)) {
      data = [...data.data];
    } else if (isObject(data.data)) {
      data = flatten({ ...data.data });
    } else if (data.data === null) {
      data = null;
    } else {
      data = flatten(data);
    }

    for (const key in data) {
      data[key] = flattenObj(data[key]);
    }

    return data;
  }

  return data;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1337/api' }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Posts'],
      // flattens response for readablity
      transformResponse: (response) => flattenObj(response.data),
    }),
    addPost: builder.mutation({
      query: (post) => ({
        url: '/posts',
        method: "POST",
        body: { data: post },
      }),
      invalidatesTags: ['Posts']
    }),
    updatePost: builder.mutation({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PUT",
        body: { data: post }
      }),
      invalidatesTags: ['Posts']

    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Posts']

    })
  })
})

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation
} = apiSlice