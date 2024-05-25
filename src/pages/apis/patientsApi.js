import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const patientsApi = createApi({
  reducerPath: "patients",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005/"}),
  tagTypes: ['Patients'],
  endpoints: (builder) => ({
    getAllPatients: builder.query({
      query: () => "patients",
     
      providesTags: (result = [], error, arg) => [
        'Patients',
        ...result.map(({ id }) => ({ type: 'Patients', id }))
      ]
    }),
    createPatient: builder.mutation({
        query: (body) => ({
          url:'patients',
          method :'POST',
          body:body
        }),
        invalidatesTags: ['Patients']
      }),
      updatePatient: builder.mutation({
        query: ({id,pid,hn,name,datebirth,datediag,datelast,methodbx,status}) => ({
          url:`patients/${id}`,
          method :'PUT',
          body:{pid,hn,name,datebirth,datediag,datelast,methodbx,status}
        }),
        invalidatesTags:(result, error, arg) => [{ type: 'Patients', id: arg.id }]
      }),
      deletePatient: builder.mutation({
        query: (id) => ({
          url:`patients/${id}`,
          method :'DELETE'
        }),
        invalidatesTags:(result, error, arg) => [{ type: 'Patients', id: arg.id }]
      })
  }),
});

export const { useGetAllPatientsQuery,useCreatePatientMutation, useUpdatePatientMutation,useDeletePatientMutation } = patientsApi;