'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/admin/users');
        setUsers(response.data.users);
      } catch (error) {
        setMessage('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/api/admin/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      setMessage('User deleted successfully');
    } catch (error) {
      setMessage('Failed to delete user');
    }
  };

  const handleEdit = async (userId, updatedData) => {
    try {
      await axios.put(`/api/admin/users/${userId}`, updatedData);
      setUsers(users.map(user => (user._id === userId ? { ...user, ...updatedData } : user)));
      setMessage('User updated successfully');
    } catch (error) {
      setMessage('Failed to update user');
    }
  };

  return (
    <div className="relative mb-5 bg-gray-100">
      <div className="absolute top-0 left-0 m-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {message && <p className="text-red-500">{message}</p>}
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">Username</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td className="py-2">{user.username}</td>
                    <td className="py-2">{user.email}</td>
                    <td className="py-2">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2"
                        onClick={() => handleEdit(user._id, { username: 'newUsername', email: 'newEmail@example.com' })}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;