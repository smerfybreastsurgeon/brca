import { createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import { apiSlice } from "../apis/apiSlice";

const neoadjuvantsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = neoadjuvantsAdapter.getInitialState()

export const extendedApiNeoadjuvantSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNeoadjuvants: builder.query({
            query: () => '/neoadjuvant',
            transformResponse: responseData => {
                let min = 1;
                const loadedNeoadjuvants = responseData.map(neo => {
                    if (!neo?.date) neo.date = sub(new Date(), { minutes: min++ }).toISOString();
                    if (!neo?.reactions) neo.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return neo;
                });
                return neoadjuvantsAdapter.setAll(initialState, loadedNeoadjuvants)
            },
            providesTags: (result, error, arg) => [
                { type: 'Neoadjuvant', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Neoadjuvant', id }))
            ]
        }),
        getNeoadjuvantsByPatientId: builder.query({
            query: id => `/neoadjuvant/?patientId=${id}`,
           
            transformResponse: responseData => {
                
                let min = 1;
                const loadedNeoadjuvants = responseData.map(neo => {
                    if (!neo?.date) neo.date = sub(new Date(), { minutes: min++ }).toISOString();
                    if (!neo?.reactions) neo.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return neo;
                });
                return neoadjuvantsAdapter.setAll(initialState, loadedNeoadjuvants)
            },
            providesTags: (result, error, arg) => [
                ...result.ids.map(id => ({ type: 'Surgery', id }))
            ]
        }),
        addNewNeoadjuvant: builder.mutation({
            query: initialNeoadjuvant => ({
                url: '/neoadjuvant',
                method: 'POST',
                body: {
                    ...initialNeoadjuvant,
                    patientId: initialNeoadjuvant.patientId,
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
                { type: 'Neoadjuvant', id: "LIST" }
            ]
        }),
        updateNeoadjuvant: builder.mutation({
            query: initialNeoadjuvant => ({
                url: `/neoadjuvant/${initialNeoadjuvant.id}`,
                method: 'PUT',
                body: {
                    ...initialNeoadjuvant,
                    date: new Date().toISOString()
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Neoadjuvant', id: arg.id }
            ]
        }),
        deleteNeoadjuvant: builder.mutation({
            query: ({ id }) => ({
                url: `/neoadjuvant/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Neoadjuvant', id: arg.id }
            ]
        }),
        addNeoadjuvantReaction: builder.mutation({
            query: ({ neoadjuvantId, reactions }) => ({
                url: `neoadjuvant/${neoadjuvantId}`,
                method: 'PATCH',
                // In a real app, we'd probably need to base this on user ID somehow
                // so that a user can't do the same reaction more than once
                body: { reactions }
            }),
            async onQueryStarted({ neoadjuvantId, reactions }, { dispatch, queryFulfilled }) {
                // `updateQueryData` requires the endpoint name and cache key arguments,
                // so it knows which piece of cache state to update
                const patchResult = dispatch(
                    // updateQueryData takes three arguments: the name of the endpoint to update, the same cache key value used to identify the specific cached data, and a callback that updates the cached data.
                    extendedApiNeoadjuvantSlice.util.updateQueryData('getNeoadjuvants', 'getNeoadjuvants', draft => {
                        // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
                        const neoadjuvant = draft.entities[neoadjuvantId]
                        if (neoadjuvant) neoadjuvant.reactions = reactions
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
    useGetNeoadjuvantsQuery,
    useGetNeoadjuvantsByPatientIdQuery,
    useAddNewNeoadjuvantMutation,
    useUpdateNeoadjuvantMutation,
    useDeleteNeoadjuvantMutation,
    useAddNeoadjuvantReactionMutation
} = extendedApiNeoadjuvantSlice