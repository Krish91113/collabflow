import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  isAuthenticated: false,
  user: null,
  workspace: {
    name: 'Acme Product',
    plan: 'Scale',
  },
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.workspace = action.payload.workspace || state.workspace;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
      state.isAuthenticated = Boolean(action.payload || state.user);
    },
    setCurrentUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = Boolean(action.payload);
    },
    clearSession(state) {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.user = null;
      state.workspace = null;
    },
  },
});

export const { setSession, setAccessToken, setCurrentUser, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;
