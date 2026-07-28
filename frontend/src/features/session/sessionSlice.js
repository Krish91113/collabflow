import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: true,
  user: {
    name: 'Maya Chen',
    email: 'maya@collabflow.app',
    role: 'Workspace Admin',
  },
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
      state.workspace = action.payload.workspace;
    },
    clearSession(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.workspace = null;
    },
  },
});

export const { setSession, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;
