import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userservice";

const initialState = {
  isLogged: false,
  isLoading: false,
  isErrored: false,
  isSuccessful: false,
  user: null,
};

export const login = createAsyncThunk(
  "user/login",
  async (userData, thunkAPI) => {
    try {
      const response = await userService.login(userData);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.toString() ||
        error.message;
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      const response = await userService.register(userData);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.toString() ||
        error.message;
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "user/getDetails",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      const response = await userService.getUserDetails(token);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.toString() ||
        error.message;
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const createGame = createAsyncThunk(
  "user/createGame",
  async (gameData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      const response = await userService.createGame(gameData, token);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.toString() ||
        error.message;
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const logout = createAsyncThunk("user/logout", (_, thunkAPI) => {
  try {
    userService.logout();
    return null;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.toString() ||
      error.message;
    return thunkAPI.rejectWithValue({ message });
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccessful = true;
      state.isLogged = true;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isErrored = true;
      state.user = null;
    });

    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccessful = true;
      state.isLogged = true;
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isErrored = true;
      state.user = null;
    });

    builder.addCase(getUserDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccessful = true;
      state.isLogged = true;
      state.user = action.payload;
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.isErrored = true;
      state.user = null;
    });

    builder.addCase(createGame.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createGame.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccessful = true;
      // Handle game creation success
    });
    builder.addCase(createGame.rejected, (state, action) => {
      state.isLoading = false;
      state.isErrored = true;
      // Handle game creation failure
    });

    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccessful = true;
      state.isLogged = false;
      state.user = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.isErrored = true;
      state.user = null;
    });
  },
});

export default userSlice.reducer;
