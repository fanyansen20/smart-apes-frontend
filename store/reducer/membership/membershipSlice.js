import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
/**
 * @import { MembershipTier, MembershipInitialState } from "types/membership"
 */

/**
 * @type {MembershipInitialState}
 */
// Auth State
const initialState = {
  status: "",
  memberType: "",
  startDate: "",
  endDate: "",
  numberOfPurchase: 0,
  totalPaid: 0,
  isLoading: false,
  error: "",
  checkoutTier: "",
  remainingProfilingTest: "",
};

/**
 *Get membership data for navbar
 *param is an object of {userId, accessToken}
 *@param {string} userId - marketplace logged in user id
 *@param {string} accessToken - jwt session access token
 */
export const getMembershipData = createAsyncThunk(
  "membership/getMembershipData",
  async ({ userId, accessToken }, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/users/${userId}/membership`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response.data.message);
    }
  }
);

/**
 * @param {typeof initialState} state
 * @param {{
 *  payload: ?MembershipTier
 *  type: string
 * }} action
 */
const updateCheckoutTierState = (state, action) => {
  state.checkoutTier = action.payload;
};

const membershipSlice = createSlice({
  name: "membershipStore",
  initialState,
  reducers: {
    setCheckoutTier: updateCheckoutTierState,
    resetMembershipData: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMembershipData.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getMembershipData.fulfilled, (state, action) => {
        state.isLoading = false;
        const {
          status,
          start_date,
          end_date,
          number_of_purchase,
          tier,
          total_paid,
          profilingTest,
        } = action.payload;
        const { remainingProfilingTest, totalProfilingTest } = profilingTest;

        state.status = status ?? "INACTIVE";
        state.memberType = tier ?? "";
        state.startDate = start_date ?? "";
        state.endDate = end_date ?? "";
        state.numberOfPurchase = number_of_purchase ?? 0;
        state.totalPaid = total_paid ?? 0;
        state.remainingProfilingTest = `${remainingProfilingTest}/${totalProfilingTest}`;
      })
      .addCase(getMembershipData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setCheckoutTier, resetMembershipData } = membershipSlice.actions;

export default membershipSlice.reducer;
