import { carRentApi } from "./carRentApi";

const userApi = carRentApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserRabats: builder.query({
      query: () => "Rabat/myRabats",
    }),
    getUserRentals: builder.query({
      query: (queryString) => `rental/UserRental?${queryString}`,
    }),
    getRentalDetails: builder.query({
      query: (id) => `rental/UserRental/${id}`,
    }),
    getUserWithlist: builder.query({
      query: () => "Wishlist/Wishlist",
      keepUnusedDataFor: 0,
    }),
    addToWishlist: builder.mutation({
      query: (carId) => ({
        url: `Wishlist/add`,
        method: "POST",
        body: JSON.stringify({ CarId: carId }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    removeFromWishlist: builder.mutation({
      query: (carId) => ({
        url: `Wishlist/${carId}`,
        method: "DELETE",
      }),
      onQueryStarted: async (carId, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          carRentApi.util.updateQueryData(
            "getUserWithlist",
            undefined,
            (draft) => {
              return draft.filter((item) => item.carId !== carId);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          console.log("error during removing from list");
          patchResult.undo();
        }
      },
    }),
    changeUserPassword: builder.mutation({
      query: (passwordData) => ({
        url: "Users/ChangePassword",
        method: "POST",
        body: JSON.stringify(passwordData),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getParsonalDeatils: builder.query({
      query: () => ({
        url: "Users/UserPersonalDetails",
      }),
    }),
    changePersonalDetails: builder.mutation({
      query: (user) => ({
        url: "Users/UpdatePersonalDetails",
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      onQueryStarted: async (user, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          userApi.util.updateQueryData(
            "getParsonalDeatils",
            undefined,
            (draft) => {
              Object.assign(draft, user);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    getNotification: builder.query({
      query: (queryString) => `Notification/myNotification?${queryString}`,
      transformResponse: (data) => {
        const transformed = data.items.map((it) => ({
          ...it,
          createdDate: it.createdDate.slice(0, 10),
        }));
        return { metaData: data.metaData, items: transformed };
      },
    }),
    readNotification: builder.mutation({
      query: (id) => ({
        url: `Notification/read/${id}`,
        method: "POST",
      }),
      onQueryStarted: async (notificationId, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          userApi.util.updateQueryData(
            "getNotification",
            undefined,
            (draft) => {
              console.log(notificationId);
              return draft.filter((item) => item.id !== id);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    loginUser: builder.mutation({
      query: (loginForm) => ({
        url: `/authentication/login`,
        method: "POST",
        body: JSON.stringify(loginForm),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getAddresses: builder.query({
      query: () => `Users/GetUserAddresses`,
    }),
    addAddress: builder.mutation({
      query: (address) => ({
        url: `Users/AddUserAddresses`,
        method: "POST",
        body: JSON.stringify(address),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    updateAddress: builder.mutation({
      query: (address) => ({
        url: `Users/UpdateUserAddresses/${address.id}`,
        method: "PUT",
        body: JSON.stringify(address),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetUserRabatsQuery,
  useGetUserRentalsQuery,
  useGetRentalDetailsQuery,
  useGetUserWithlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useChangeUserPasswordMutation,
  useGetParsonalDeatilsQuery,
  useChangePersonalDetailsMutation,
  useGetNotificationQuery,
  useReadNotificationMutation,
  useLoginUserMutation,
  useGetAddressesQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
} = userApi;
