import dbConnect from '../../../utils/dbConnect';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { username, password, email } = req.body;

    try {
      const user = new User({ username, password, email });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}