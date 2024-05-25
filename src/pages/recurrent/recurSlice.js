import { createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import { apiSlice } from "../apis/apiSlice";

const recursAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = recursAdapter.getInitialState()

export const extendedApiRecurSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRecurs: builder.query({
            query: () => '/recur',
            transformResponse: responseData => {
                let min = 1;
                const loadedRecurs = responseData.map(rc => {
                    if (!rc?.date) rc.date = sub(new Date(), { minutes: min++ }).toISOString();
                    if (!rc?.reactions) rc.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return rc;
                });
                return recursAdapter.setAll(initialState, loadedRecurs)
            },
            providesTags: (result, error, arg) => [
                { type: 'Recur', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Recur', id }))
            ]
        }),
        getRecursByPatientId: builder.query({
            query: id => `/recur/?patientId=${id}`,
           
            transformResponse: responseData => {
                
                let min = 1;
                const loadedRecurs = responseData.map(rc => {
                    if (!rc?.date) rc.date = sub(new Date(), { minutes: min++ }).toISOString();
                    if (!rc?.reactions) rc.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return rc;
                });
                return recursAdapter.setAll(initialState, loadedRecurs)
            },
            providesTags: (result, error, arg) => [
                ...result.ids.map(id => ({ type: 'Recur', id }))
            ]
        }),
        addNewRecur: builder.mutation({
            query: initialRecur => ({
                url: '/recur',
                method: 'POST',
                body: {
                    ...initialRecur,
                    patientId: initialRecur.patientId,
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
                { type: 'Recur', id: "LIST" }
            ]
        }),
        updateRecur: builder.mutation({
            query: initialRecur => ({
                url: `/recur/${initialRecur.id}`,
                method: 'PUT',
                body: {
                    ...initialRecur,
                    date: new Date().toISOString()
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Recur', id: arg.id }
            ]
        }),
        deleteRecur: builder.mutation({
            query: ({ id }) => ({
                url: `/recur/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Recur', id: arg.id }
            ]
        }),
        addRecReaction: builder.mutation({
            query: ({ recurId, reactions }) => ({
                url: `recur/${recurId}`,
                method: 'PATCH',
                // In a real app, we'd probably need to base this on user ID somehow
                // so that a user can't do the same reaction more than once
                body: { reactions }
            }),
            async onQueryStarted({ recurId, reactions }, { dispatch, queryFulfilled }) {
                // `updateQueryData` requires the endpoint name and cache key arguments,
                // so it knows which piece of cache state to update
                const patchResult = dispatch(
                    // updateQueryData takes three arguments: the name of the endpoint to update, the same cache key value used to identify the specific cached data, and a callback that updates the cached data.
                    extendedApiRecurSlice.util.updateQueryData('getRecurs', 'getRecurs', draft => {
                        // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
                        const recur = draft.entities[recurId]
                        if (recur) recur.reactions = reactions
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
    useGetRecursQuery,
    useGetRecursByPatientIdQuery,
    useAddNewRecurMutation,
    useUpdateRecurMutation,
    useDeleteRecurMutation,
    useAddRecReactionMutation
} = extendedApiRecurSlice