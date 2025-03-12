import dbConnect from '@/utils/dbConnect';
import User from '@/models/Users';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { username, email, password, role } = req.body;

    try {
      console.log('Received signup request:', { username, email, password });

      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Hashed password:', hashedPassword);

      // Create a new user with the hashed password
      const newUser = new User({
        username,
        email,
        password: hashedPassword, // Store the hashed password
        role: role || 'user', // Default to 'user' if role is not provided
      });

      await newUser.save();
      console.log('User created successfully:', newUser);

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}