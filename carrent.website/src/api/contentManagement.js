import { carRentApi } from "./carRentApi";

const contentManagementApi = carRentApi.injectEndpoints({
  endpoints: (builder) => ({
    getFooter: builder.query({
      query: () => "ContentManagement/footer",
    }),
    getContactPage: builder.query({
      query: () => "ContentManagement/contact",
    }),
    subscribeNewsletter: builder.mutation({
      query: (newSubscription) => ({
        url: "Newsletter/subscribe",
        method: "POST",
        body: JSON.stringify(newSubscription),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetFooterQuery,
  useSubscribeNewsletterMutation,
  useGetContactPageQuery,
} = contentManagementApi;
