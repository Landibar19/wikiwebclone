import mongoose from 'mongoose';
import dbConnect from './src/utils/dbConnect.js';
import dotenv from 'dotenv';

// Load environment variables from .env.local file
dotenv.config({ path: '.env.local' });

// Verify that the environment variable is loaded
console.log('MONGODB_URI:', process.env.MONGODB_URI);

// Function to test the database connection
async function testConnection() {
  try {
    await dbConnect();
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  } finally {
    // Close the connection when done
    mongoose.connection.close();
  }
}

// Run the test
testConnection();