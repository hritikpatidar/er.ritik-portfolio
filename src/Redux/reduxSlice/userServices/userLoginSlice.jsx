import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginServices, optVerificationService, supportAndContectUSService } from "../../../Services/userServices/authanticationService";

const initialState = {
  loading: false,
  registerData: {},
  error: "",
};

export const otpVerification = createAsyncThunk(
  "userVerify/USerVerifyotp",
  async (payload) => {
    const response = await optVerificationService(payload)
    return response;
  }
);

export const userLoginService = createAsyncThunk(
  "userlogin/USerloginservice",
  async (payload) => {
    const response = await loginServices(payload)
    return response;
  }
);


const userLoginSlice = createSlice({
  name: "USerVerifyData",
  initialState,
  reducers: {
    resetForm: (state) => {
      state.loading = false;
      state.registerData = {};
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(otpVerification.pending, (state) => {
      state.registerData = true;
    });
    builder.addCase(otpVerification.fulfilled, (state, action) => {
      state.loading = false;
      state.registerData = action.payload?.data;
      state.error = "";
    });
    builder.addCase(otpVerification.rejected, (state, action) => {
      state.loading = false;
      state.registerData = {};
      state.error = action.error.message;
    });
    // ----------------------------------------------------
    builder.addCase(LogoutService.pending, (state) => {
      state.registerData = true;
    });
    builder.addCase(LogoutService.fulfilled, (state, action) => {
      state.loading = false;
      state.registerData = {};
      state.error = "";
    });
    builder.addCase(LogoutService.rejected, (state, action) => {
      state.loading = false;
      state.registerData = {};
      state.error = action.error.message;
    });
  },
});

export const { resetForm } = userLoginSlice.actions;
export default userLoginSlice.reducer;
