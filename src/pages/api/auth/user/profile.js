import dbConnect from '@/utils/dbConnect';
import User from '@/models/Users';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const { authorization } = req.headers;
    if (!authorization) {
      console.log('No authorization header found');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      console.log('No token found');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded); // Log the decoded token

      const user = await User.findById(decoded.userId).select('username email photo role');
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found' });
      }

      console.log('User data:', user); // Log the user data
      res.status(200).json(user);
    } catch (error) {
      console.error('Error verifying token or fetching user data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}