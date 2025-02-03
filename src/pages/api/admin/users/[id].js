import dbConnect from '@/utils/dbConnect';
import User from '@/models/Users';

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'PUT') {
    const { username, email, password } = req.body;

    try {
      const updatedData = {};
      if (username) updatedData.username = username;
      if (email) updatedData.email = email;
      if (password) updatedData.password = await bcrypt.hash(password, 10);

      await User.findByIdAndUpdate(id, updatedData);
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['DELETE', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}