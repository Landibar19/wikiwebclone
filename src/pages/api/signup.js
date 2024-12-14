import dbConnect from '../../utils/dbConnect';
import User from '../../models/Users';

export default async function handler(req, res) {
  console.log('API route hit');
  await dbConnect();

  if (req.method === 'POST') {
    const { username, email, password } = req.body;
    console.log('Request body:', req.body);

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('User already exists');
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create a new user
      const user = new User({ username, email, password });
      await user.save();

      console.log('User created successfully');
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Internal server error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    console.log('Method not allowed');
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}