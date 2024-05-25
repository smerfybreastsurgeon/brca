import { createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import { apiSlice } from "../apis/apiSlice";

const surgerysAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = surgerysAdapter.getInitialState()

export const extendedApiSurgerySlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSurgerys: builder.query({
            query: () => '/surgery',
            transformResponse: responseData => {
                let min = 1;
                const loadedSurgerys = responseData.map(sg => {
                    if (!sg?.date) sg.date = sub(new Date(), { minutes: min++ }).toISOString();
                    if (!sg?.reactions) sg.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return sg;
                });
                return surgerysAdapter.setAll(initialState, loadedSurgerys)
            },
            providesTags: (result, error, arg) => [
                { type: 'Surgery', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Surgery', id }))
            ]
        }),
        getSurgerysByPatientId: builder.query({
            query: id => `/surgery/?patientId=${id}`,
           
            transformResponse: responseData => {
                
                let min = 1;
                const loadedSurgerys = responseData.map(sg => {
                    if (!sg?.date) sg.date = sub(new Date(), { minutes: min++ }).toISOString();
                    if (!sg?.reactions) sg.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return sg;
                });
                return surgerysAdapter.setAll(initialState, loadedSurgerys)
            },
            providesTags: (result, error, arg) => [
                ...result.ids.map(id => ({ type: 'Surgery', id }))
            ]
        }),
        addNewSurgery: builder.mutation({
            query: initialSurgery => ({
                url: '/surgery',
                method: 'POST',
                body: {
                    ...initialSurgery,
                    patientId: initialSurgery.patientId,
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
            invalidatesTags: [
                { type: 'Surgery', id: "LIST" }
            ]
        }),
        updateSurgery: builder.mutation({
            query: initialSurgery => ({
                url: `/surgery/${initialSurgery.id}`,
                method: 'PUT',
                body: {
                    ...initialSurgery,
                    date: new Date().toISOString()
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Surgery', id: arg.id }
            ]
        }),
        deleteSurgery: builder.mutation({
            query: ({ id }) => ({
                url: `/surgery/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Surgery', id: arg.id }
            ]
        }),
        addSurgReaction: builder.mutation({
            query: ({ surgeryId, reactions }) => ({
                url: `surgery/${surgeryId}`,
                method: 'PATCH',
                // In a real app, we'd probably need to base this on user ID somehow
                // so that a user can't do the same reaction more than once
                body: { reactions }
            }),
            async onQueryStarted({ surgeryId, reactions }, { dispatch, queryFulfilled }) {
                // `updateQueryData` requires the endpoint name and cache key arguments,
                // so it knows which piece of cache state to update
                const patchResult = dispatch(
                    // updateQueryData takes three arguments: the name of the endpoint to update, the same cache key value used to identify the specific cached data, and a callback that updates the cached data.
                    extendedApiSurgerySlice.util.updateQueryData('getSurgerys', 'getSurgerys', draft => {
                        // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
                        const surgery = draft.entities[surgeryId]
                        if (surgery) surgery.reactions = reactions
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            }
        })
    })
})

export const {
    useGetSurgerysQuery,
    useGetSurgerysByPatientIdQuery,
    useAddNewSurgeryMutation,
    useUpdateSurgeryMutation,
    useDeleteSurgeryMutation,
    useAddSurgReactionMutation
} = extendedApiSurgerySlice