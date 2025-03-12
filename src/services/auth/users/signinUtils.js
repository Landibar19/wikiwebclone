import axios from 'axios';
import Cookies from 'js-cookie';
import { login } from '@/redux/slices/authSlice';

export const handleLogin = async (event, username, password, keepLoggedIn, setMessage, dispatch, router) => {
  event.preventDefault();
  try {
    const response = await axios.post('/api/auth/user/signin', {
      username,
      password,
    });
    console.log('Login successful:', response.data);
    setMessage(response.data.message);
    // Set cookies
    Cookies.set('accessToken', response.data.accessToken, { expires: keepLoggedIn ? 7 : 1 });
    Cookies.set('refreshToken', response.data.refreshToken, { expires: 7 });
    console.log('Access token set in cookies:', Cookies.get('accessToken')); // Debugging statement
    console.log('Refresh token set in cookies:', Cookies.get('refreshToken')); // Debugging statement
    // Dispatch login action
    dispatch(login());
    // Redirect to home page after successful login
    router.push('/');
  } catch (error) {
    console.error('Login failed:', error.response.data);
    setMessage(error.response.data.message);
  }
};

export const handleRequestResetPassword = async (event, email, setMessage) => {
  event.preventDefault();
  try {
    const response = await axios.post('/api/auth/request-reset-password', { email });
    console.log('Reset token sent:', response.data);
    setMessage(response.data.message);
  } catch (error) {
    console.error('Error requesting password reset:', error.response.data);
    setMessage(error.response.data.message);
  }
};