import { api } from '../../api'

export const policeApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchIncidentList: build.query({
      query: (body) => ({
        url: '/visualization/jjdbGabAssociation/byPage',
        body: body,
        method: 'POST',
      }),
    }),
    // fetchPoliceData: build.mutation({
    //   query: (body) => ({
    //     url: '/jjdbGabAssociation/byPage',
    //     body,
    //   }),
    // }),
  }),
  overrideExisting: false,
})

export const { useFetchIncidentListQuery } = policeApi
