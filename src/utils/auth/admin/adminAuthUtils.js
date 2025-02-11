import axios from 'axios';
import { login } from '@/redux/slices/authSlice';

export const handleAdminLogin = async (event, username, password, setMessage, setLoading, dispatch, router) => {
  event.preventDefault();

  setLoading(true);
  setMessage('');

  try {
    const response = await axios.post('/api/admin/signin', {
      username,
      password,
    });
    setMessage(response.data.message);
    dispatch(login());
    // Set isAdmin state to true
    setTimeout(() => {
      router.push('/pages/admin/dashboard');
    }, 2000);
  } catch (error) {
    setMessage(error.response.data.message);
  } finally {
    setLoading(false);
  }
};