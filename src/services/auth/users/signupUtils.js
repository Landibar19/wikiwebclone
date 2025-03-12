import axios from 'axios';

export const signUp = async (username, email, password, setMessage, setSuccess, setLoading, router) => {
  setLoading(true);
  setMessage('');
  setSuccess(false);

  try {
    const response = await axios.post('/api/auth/user/signup', {
      username,
      email,
      password,
    });
    setMessage(response.data.message);
    setSuccess(true);
    // Redirect to login page after a short delay
    setTimeout(() => {
      router.push('/pages/auth/signin');
    }, 3000);
  } catch (error) {
    setMessage(error.response.data.message);
  } finally {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Ensure loading state lasts for at least 3 seconds
  }
};

export const signIn = async (email, password, setMessage, setLoading, router) => {
  setLoading(true);
  setMessage('');

  try {
    const response = await axios.post('/api/auth/signin', {
      email,
      password,
    });
    setMessage(response.data.message);
    // Redirect to dashboard or home page after a short delay
    setTimeout(() => {
      router.push('/dashboard');
    }, 3000);
  } catch (error) {
    setMessage(error.response.data.message);
  } finally {
    setLoading(false);
  }
};