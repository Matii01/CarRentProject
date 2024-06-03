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
} = userApi;
