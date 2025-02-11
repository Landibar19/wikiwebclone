'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchUsers, deleteUser, editUser, saveUser, resetPassword } from '@/utils/auth/admin/adminUtils';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [editUsername, setEditUsername] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchUsers(setUsers, setMessage, setLoading);
  }, []);

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
                    <td className="py-2">
                      {editingUserId === user._id ? (
                        <input
                          type="text"
                          value={editUsername}
                          onChange={(e) => setEditUsername(e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      ) : (
                        user.username
                      )}
                    </td>
                    <td className="py-2">
                      {editingUserId === user._id ? (
                        <input
                          type="email"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td className="py-2">
                      {editingUserId === user._id ? (
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                          onClick={() => saveUser(user._id, editUsername, editEmail, users, setUsers, setMessage, setEditingUserId)}
                        >
                          Save
                        </button>
                      ) : (
                        <>
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2"
                            onClick={() => editUser(user, setEditingUserId, setEditUsername, setEditEmail)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
                            onClick={() => deleteUser(user._id, users, setUsers, setMessage)}
                          >
                            Delete
                          </button>
                          <button
                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded ml-2"
                            onClick={() => resetPassword(user._id, users, setMessage)}
                          >
                            Reset Password
                          </button>
                        </>
                      )}
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