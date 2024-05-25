import { createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import { apiSlice } from "../apis/apiSlice";

const pstagesAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = pstagesAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPstages: builder.query({
            query: () => '/pstage',
            transformResponse: responseData => {
                let min = 1;
                const loadedPstages = responseData.map(ps => {
                    if (!ps?.date) ps.date = sub(new Date(), { minutes: min++ }).toISOString();
                    if (!ps?.reactions) ps.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return ps;
                });
                return pstagesAdapter.setAll(initialState, loadedPstages)
            },
            providesTags: (result, error, arg) => [
                { type: 'Pstage', id: "PLIST" },
                ...result.ids.map(id => ({ type: 'Pstage', id }))
            ]
        }),
        getPstagesByPatientId: builder.query({
            query: id => `/pstage/?patientId=${id}`,
           
            transformResponse: responseData => {
                
                let min = 1;
                const loadedPstages = responseData.map(ps => {
                    if (!ps?.date) ps.date = sub(new Date(), { minutes: min++ }).toISOString();
                    if (!ps?.reactions) ps.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return ps;
                });
                return pstagesAdapter.setAll(initialState, loadedPstages)
            },
            providesTags: (result, error, arg) => [
                ...result.ids.map(id => ({ type: 'Pstage', id }))
            ]
        }),
        addNewPstage: builder.mutation({
            query: initialPstage => ({
                url: '/pstage',
                method: 'POST',
                body: {
                    ...initialPstage,
                    patientId: initialPstage.patientId,
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
                { type: 'Pstage', id: "PLIST" }
            ]
        }),
        updatePstage: builder.mutation({
            query: initialPstage => ({
                url: `/pstage/${initialPstage.id}`,
                method: 'PUT',
                body: {
                    ...initialPstage,
                    date: new Date().toISOString()
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Pstage', id: arg.id }
            ]
        }),
        deletePstage: builder.mutation({
            query: ({ id }) => ({
                url: `/pstage/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Pstage', id: arg.id }
            ]
        }),
        addReaction: builder.mutation({
            query: ({ pstageId, reactions }) => ({
                url: `pstage/${pstageId}`,
                method: 'PATCH',
                // In a real app, we'd probably need to base this on user ID somehow
                // so that a user can't do the same reaction more than once
                body: { reactions }
            }),
            async onQueryStarted({ pstageId, reactions }, { dispatch, queryFulfilled }) {
                // `updateQueryData` requires the endpoint name and cache key arguments,
                // so it knows which piece of cache state to update
                const patchResult = dispatch(
                    // updateQueryData takes three arguments: the name of the endpoint to update, the same cache key value used to identify the specific cached data, and a callback that updates the cached data.
                    extendedApiSlice.util.updateQueryData('getPstages', 'getPstages', draft => {
                        // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
                        const pstage = draft.entities[pstageId]
                        if (pstage) pstage.reactions = reactions
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
    useGetPstagesQuery,
    useGetPstagesByPatientIdQuery,
    useAddNewPstageMutation,
    useUpdatePstageMutation,
    useDeletePstageMutation,
    useAddReactionMutation
} = extendedApiSlice