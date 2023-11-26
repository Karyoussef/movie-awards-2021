import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiUrl = process.env.REACT_APP_API_URL;

export const awardsApi = createApi({
    reducerPath: "awardsApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    endpoints: (builder) => ({
        getAwardsList: builder.query({
            query: () => "awards",
            transformResponse: (response, meta, arg) => {
                response.forEach(award => award.selectedId = null);
                return response;
            }    
        }),
        
    }),
})

export const updateNomination = (categoryId, nomineeId, isSelected) => awardsApi.util.updateQueryData(
    "getAwardsList",
    undefined,
    (awardsList) => {
        let updatedIndex = awardsList.findIndex(award => award.id === categoryId);
        awardsList[updatedIndex].selectedId = isSelected? null : nomineeId;
    }
)

export const { useGetAwardsListQuery } = awardsApi;