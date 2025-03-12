'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Cookies from 'js-cookie';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [message, setMessage] = useState('');
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    // Fetch user data from the API
    const fetchUserData = async () => {
      try {
        // Use `clientAccessToken` instead of `accessToken`
        const accessToken = Cookies.get('clientAccessToken'); 
        console.log('Access token from cookies:', accessToken);

        if (!accessToken) {
          throw new Error('Not authenticated');
        }

        const response = await axios.get('/api/auth/user/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true, // Ensure cookies are sent with the request
        });

        setUserData(response.data);
        console.log('User data:', response.data);
        setProfilePhoto(response.data.photo);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  const handlePhotoUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    
    // Get the file from the input and append it to FormData
    const file = event.target.elements.profilePhoto.files[0];
    if (!file) {
      setMessage('No file selected');
      return;
    }
  
    formData.append('profilePhoto', file);
  
    try {
      const accessToken = Cookies.get('clientAccessToken');
      if (!accessToken) {
        throw new Error('Not authenticated');
      }
  
      const response = await axios.post('/api/auth/user/upload-photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure correct content type for file uploads
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true, // Ensure cookies are sent
      });
  
      setMessage(response.data.message);
      setProfilePhoto(response.data.profilePhoto); // Update the profile photo URL
      console.log('Updated profile photo:', response.data.profilePhoto);
  
    } catch (error) {
      console.error('Error uploading photo:', error);
      setMessage('Error uploading photo');
    }
  };
  

  return (
    <div className="relative mb-5 bg-gray-100 p-5">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      {message && <p className="text-red-500">{message}</p>}
      
      <div className="mb-4">
        <h2 className="text-xl font-bold">User Information</h2>
        <p><strong>Username:</strong> {userData.username}</p>
        <p><strong>Email:</strong> {userData.email}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold">Profile Photo</h2>
        {profilePhoto ? (
          <Image
            src={profilePhoto}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-2"
            width={96}
            height={96}
          />
        ) : (
          <p>No profile photo available</p>
        )}
        <form onSubmit={handlePhotoUpload}>
          <input type="file" name="profilePhoto" accept="image/*" className="mb-2" />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Upload Photo
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
