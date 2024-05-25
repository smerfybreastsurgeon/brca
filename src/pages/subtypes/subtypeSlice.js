import { createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import { apiSlice } from "../apis/apiSlice";

const subtypesAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = subtypesAdapter.getInitialState()

export const extendedApiSubtypeSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSubtypes: builder.query({
            query: () => '/subtype',
            transformResponse: responseData => {
                let min = 1;
                const loadedSubtypes = responseData.map(ps => {
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
                return subtypesAdapter.setAll(initialState, loadedSubtypes)
            },
            providesTags: (result, error, arg) => [
                { type: 'Subtype', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Subtype', id }))
            ]
        }),
        getSubtypesByPatientId: builder.query({
            query: id => `/subtype/?patientId=${id}`,
           
            transformResponse: responseData => {
                
                let min = 1;
                const loadedSubtypes = responseData.map(ps => {
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
                return subtypesAdapter.setAll(initialState, loadedSubtypes)
            },
            providesTags: (result, error, arg) => [
                ...result.ids.map(id => ({ type: 'Subtype', id }))
            ]
        }),
        addNewSubtype: builder.mutation({
            query: initialSubtype => ({
                url: '/subtype',
                method: 'POST',
                body: {
                    ...initialSubtype,
                    patientId: initialSubtype.patientId,
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
                { type: 'Subtype', id: "LIST" }
            ]
        }),
        updateSubtype: builder.mutation({
            query: initialSubtype => ({
                url: `/subtype/${initialSubtype.id}`,
                method: 'PUT',
                body: {
                    ...initialSubtype,
                    date: new Date().toISOString()
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Subtype', id: arg.id }
            ]
        }),
        deleteSubtype: builder.mutation({
            query: ({ id }) => ({
                url: `/subtype/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Subtype', id: arg.id }
            ]
        }),
        addSubReaction: builder.mutation({
            query: ({ subtypeId, reactions }) => ({
                url: `subtype/${subtypeId}`,
                method: 'PATCH',
                // In a real app, we'd probably need to base this on user ID somehow
                // so that a user can't do the same reaction more than once
                body: { reactions }
            }),
            async onQueryStarted({ subtypeId, reactions }, { dispatch, queryFulfilled }) {
                // `updateQueryData` requires the endpoint name and cache key arguments,
                // so it knows which piece of cache state to update
                const patchResult = dispatch(
                    // updateQueryData takes three arguments: the name of the endpoint to update, the same cache key value used to identify the specific cached data, and a callback that updates the cached data.
                    extendedApiSubtypeSlice.util.updateQueryData('getSubtypes', 'getSubtypes', draft => {
                        // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
                        const subtype = draft.entities[subtypeId]
                        if (subtype) subtype.reactions = reactions
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
    useGetSubtypesQuery,
    useGetSubtypesByPatientIdQuery,
    useAddNewSubtypeMutation,
    useUpdateSubtypeMutation,
    useDeleteSubtypeMutation,
    useAddSubReactionMutation
} = extendedApiSubtypeSlice