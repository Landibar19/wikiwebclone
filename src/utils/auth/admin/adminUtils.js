import axios from 'axios';

export const fetchUsers = async (setUsers, setMessage, setLoading) => {
  try {
    const response = await axios.get('/api/admin/users');
    setUsers(response.data.users);
  } catch (error) {
    setMessage('Failed to fetch users');
  } finally {
    setLoading(false);
  }
};

export const deleteUser = async (userId, users, setUsers, setMessage) => {
  try {
    await axios.delete(`/api/admin/users/${userId}`);
    setUsers(users.filter(user => user._id !== userId));
    setMessage('User deleted successfully');
  } catch (error) {
    setMessage('Failed to delete user');
  }
};

export const editUser = (user, setEditingUserId, setEditUsername, setEditEmail) => {
  setEditingUserId(user._id);
  setEditUsername(user.username);
  setEditEmail(user.email);
};

export const saveUser = async (userId, editUsername, editEmail, users, setUsers, setMessage, setEditingUserId) => {
  try {
    await axios.put(`/api/admin/users/${userId}`, { username: editUsername, email: editEmail });
    setUsers(users.map(user => (user._id === userId ? { ...user, username: editUsername, email: editEmail } : user)));
    setMessage('User updated successfully');
    setEditingUserId(null);
  } catch (error) {
    setMessage('Failed to update user');
  }
};

export const resetPassword = async (userId, users, setMessage) => {
  try {
    const user = users.find(user => user._id === userId);
    await axios.post('/api/auth/request-reset-password', { email: user.email, isAdminRequest: true });
    setMessage('Password reset email sent successfully');
  } catch (error) {
    setMessage('Failed to send password reset email');
  }
};