import dbConnect from '@/utils/dbConnect';
import User from '@/models/Users';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default async function handler(req, res) {
  await dbConnect();

  console.log('API route hit:', req.method); // Debugging statement

  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      console.log('Received login request:', { username, password });

      const user = await User.findOne({ username });
      if (!user) {
        console.log('User not found');
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      console.log('Stored hashed password:', user.password); // Log the stored hashed password

      // Check if the password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(`Password match: ${isMatch}`);

      if (!isMatch) {
        console.log('Password does not match');
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Generate access token
      const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log('Generated access token:', accessToken);

      // Generate refresh token
      const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
      console.log('Generated refresh token:', refreshToken);

      // Set cookies
      res.setHeader('Set-Cookie', [
        // httpOnly cookie for server-side security
        cookie.serialize('accessToken', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 3600,
          sameSite: 'strict',
          path: '/'
        }),
        // Non-httpOnly cookie for client-side access
        cookie.serialize('clientAccessToken', accessToken, {
          httpOnly: false,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 3600,
          sameSite: 'strict',
          path: '/'
        }),
        cookie.serialize('refreshToken', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 604800,
          sameSite: 'strict',
          path: '/'
        })
      ]);

      console.log('Cookies set successfully');
    
      res.status(200).json({ message: 'Login successful', accessToken, refreshToken });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    console.log('Method not allowed:', req.method); 
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}