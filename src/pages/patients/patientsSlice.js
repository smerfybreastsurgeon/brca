import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../apis/apiSlice";
import { sub } from 'date-fns';

const patientsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})


const initialState = patientsAdapter.getInitialState()
//สามารถเลือกผู้ป่วยจาก patientId entitis ได้ entities[patientId]

export const patientsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPatients: builder.query({
            query: () => '/patients',
            transformResponse: responseData => {
                let min = 1;
                const loadedPatients = responseData.map(pt => {
                    if (!pt?.date) pt.date = sub(new Date(), { minutes: min++ }).toISOString();
                    if (!pt?.reactions) pt.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return pt;
                });
                return patientsAdapter.setAll(initialState, loadedPatients)
            },
            providesTags: (result, error, arg) => [
                { type: 'Patient', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Patient', id }))
            ]
        }),
        getPatientsByField: builder.query({
            query: (field) => { if (field?.value === 'agedx') {
                
                 return `patients?${field?.value}_lte=${Number(field?.label)}`;
              } else {               
                return `patients?${field?.value}_like=${field?.label}`;}},
            transformResponse: responseData => {
                let min = 1;
                const loadedPatients = responseData.map(pt => {
                    if (!pt?.date) pt.date = sub(new Date(), { minutes: min++ }).toISOString();
                    if (!pt?.reactions) pt.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return pt;
                });
                return patientsAdapter.setAll(initialState, loadedPatients)
            },
            providesTags: (result, error, arg) => [
                { type: 'Patient', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Patient', id }))
            ]
        }),
        addPatient: builder.mutation({
            query: patient => ({
                url: '/patients',
                method: 'POST',
                body: {
                  ...patient,
                    date: new Date().toISOString(),
                    reactions: {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                }
            }),
            invalidatesTags: [{ type: 'Patient', id: "LIST" }],
             }),
             updatePatient: builder.mutation({
                query: initialPatient => ({
                    url: `/patients/${initialPatient.id}`,
                    method: 'PUT',
                    body: {
                        ...initialPatient,
                        date: new Date().toISOString()
                    }
                }),
                invalidatesTags: (result, error, arg) => [
                    { type: 'Patient', id: arg.id }
                ]
            }),
             deletePatient: builder.mutation({
                query: ({ id }) => ({
                    url: `/patients/${id}`,
                    method: 'DELETE',
                    body: { id }
                }),
                invalidatesTags: (result, error, arg) => [
                    { type: 'Patient', id: arg.id }
                ]
            }),
    })
})

export const {
    useGetPatientsQuery,
    useAddPatientMutation,
    useDeletePatientMutation,
    useUpdatePatientMutation,
    useGetPatientsByFieldQuery
} = patientsApiSlice