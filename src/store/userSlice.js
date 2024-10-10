import { createSlice } from "@reduxjs/toolkit";

  const initialState = {
    data: null,
    loading: false,
    error: null,
  };

  const userSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
      setUser: (state, action) => {
        state.data = action.payload;
      },
      setLoading: (state, action) => {
        state.loading = action.payload;
      },
      setError: (state, action) => {
        state.error = action.payload;
      },
      setLogout: (state , action) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      } 
    },
  });

  export const { setUser, setLoading, setError, setToken , setLogout } = userSlice.actions; 
  export default userSlice.reducer;