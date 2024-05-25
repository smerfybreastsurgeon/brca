import { createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import { apiSlice } from "../apis/apiSlice";

const cstagesAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = cstagesAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCstages: builder.query({
            query: () => '/cstage',
            transformResponse: responseData => {
                let min = 1;
                const loadedCstages = responseData.map(cs => {
                    if (!cs?.date) cs.date = sub(new Date(), { minutes: min++ }).toISOString();
                    if (!cs?.reactions) cs.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return cs;
                });
                return cstagesAdapter.setAll(initialState, loadedCstages)
            },
            providesTags: (result, error, arg) => [
                { type: 'Cstage', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Cstage', id }))
            ]
        }),
        getCstagesByPatientId: builder.query({
            query: id => `/cstage/?patientId=${id}`,
           
            transformResponse: responseData => {
                
                let min = 1;
                const loadedCstages = responseData.map(cs => {
                    if (!cs?.date) cs.date = sub(new Date(), { minutes: min++ }).toISOString();
                    if (!cs?.reactions) cs.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return cs;
                });
                return cstagesAdapter.setAll(initialState, loadedCstages)
            },
            providesTags: (result, error, arg) => [
                ...result.ids.map(id => ({ type: 'Cstage', id }))
            ]
        }),
        addNewCstage: builder.mutation({
            query: initialCstage => ({
                url: '/cstage',
                method: 'POST',
                body: {
                    ...initialCstage,
                    patientId: initialCstage.patientId,
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
                { type: 'Cstage', id: "LIST" }
            ]
        }),
        updateCstage: builder.mutation({
            query: initialCstage => ({
                url: `/cstage/${initialCstage.id}`,
                method: 'PUT',
                body: {
                    ...initialCstage,
                    date: new Date().toISOString()
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Cstage', id: arg.id }
            ]
        }),
        deleteCstage: builder.mutation({
            query: ({ id }) => ({
                url: `/cstage/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Cstage', id: arg.id }
            ]
        }),
        addCReaction: builder.mutation({
            query: ({ cstageId, reactions }) => ({
                url: `cstage/${cstageId}`,
                method: 'PATCH',
                // In a real app, we'd probably need to base this on user ID somehow
                // so that a user can't do the same reaction more than once
                body: { reactions }
            }),
            async onQueryStarted({ cstageId, reactions }, { dispatch, queryFulfilled }) {
                // `updateQueryData` requires the endpoint name and cache key arguments,
                // so it knows which piece of cache state to update
                const patchResult = dispatch(
                    // updateQueryData takes three arguments: the name of the endpoint to update, the same cache key value used to identify the specific cached data, and a callback that updates the cached data.
                    extendedApiSlice.util.updateQueryData('getCstages', 'getCstages', draft => {
                        // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
                        const cstage = draft.entities[cstageId]
                        if (cstage) cstage.reactions = reactions
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
    useGetCstagesQuery,
    useGetCstagesByPatientIdQuery,
    useAddNewCstageMutation,
    useUpdateCstageMutation,
    useDeleteCstageMutation,
    useAddCReactionMutation
} = extendedApiSlice