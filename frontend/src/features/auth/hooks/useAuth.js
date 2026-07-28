import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAxiosAccessToken } from '../../../api/axiosClient.js';
import { useToast } from '../../../hooks/useToast.js';
import { clearSession, setAccessToken, setCurrentUser, setSession } from '../../session/sessionSlice.js';
import * as authApi from '../api/authApi.js';

function getAuthPayload(response) {
  return {
    accessToken: response?.data?.accessToken || null,
    user: response?.data?.user || null,
  };
}

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const session = useSelector((state) => state.session);

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      const { accessToken, user } = getAuthPayload(response);
      if (user?.status === 'BLOCKED') {
        setAxiosAccessToken(null);
        dispatch(clearSession());
        showToast({ title: 'Account locked', description: 'This account is blocked and cannot sign in.', tone: 'error' });
        return;
      }
      setAxiosAccessToken(accessToken);
      dispatch(setSession({ accessToken, user }));
      showToast({ title: 'Signed in', description: response.message, tone: 'success' });
    },
  });

  const registerMutation = useMutation({
    mutationFn: (values) => {
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      return authApi.register(payload);
    },
    onSuccess: (response) => {
      const { accessToken, user } = getAuthPayload(response);
      setAxiosAccessToken(accessToken);
      dispatch(setSession({ accessToken, user }));
      showToast({ title: 'Account created', description: response.message, tone: 'success' });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      setAxiosAccessToken(null);
      dispatch(clearSession());
      queryClient.clear();
      navigate('/login', { replace: true });
    },
  });

  const refreshMutation = useMutation({
    mutationFn: authApi.refreshAccessToken,
    onSuccess: (response) => {
      const accessToken = response?.data?.accessToken || null;
      dispatch(setAccessToken(accessToken));
      showToast({ title: 'Session refreshed', description: response.message, tone: 'success' });
    },
    onError: () => {
      setAxiosAccessToken(null);
      dispatch(clearSession());
      navigate('/session-expired', { replace: true });
    },
  });

  const meMutation = useMutation({
    mutationFn: authApi.getCurrentUser,
    onSuccess: (response) => {
      dispatch(setCurrentUser(response.data));
    },
  });

  return {
    ...session,
    getError: authApi.normalizeApiError,
    loginMutation,
    logoutMutation,
    meMutation,
    refreshMutation,
    registerMutation,
  };
}
