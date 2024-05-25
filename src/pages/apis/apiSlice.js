import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api', // optional
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005' }),
    tagTypes: ['Pstage','Subtype','Cstage', 'Patient','Surgery','Neoadjuvant','Recur','User'],
    endpoints: builder => ({})
})