import fs from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/Users';
import jwt from 'jsonwebtoken';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parsing
  },
};

export default async function handler(req, res) {
  await dbConnect();

  // Get the authorization token from the headers
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // Optional: log the decoded token for debugging

    // Authenticate the user using the decoded userId
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.method === 'POST') {
      try {
        // Initialize the formidable form
        const form = new IncomingForm({
          uploadDir: path.resolve('./public/uploads'), // Define upload directory
          keepExtensions: true,
          multiples: false, // Only allow one file upload
        });

        // Ensure the upload directory exists
        if (!fs.existsSync(form.uploadDir)) {
          fs.mkdirSync(form.uploadDir, { recursive: true });
        }

        // Parse the form and handle the file upload
        form.parse(req, async (err, fields, files) => {
          if (err) {
            console.error('Formidable error:', err);
            return res.status(500).json({ message: 'File upload error' });
          }

          console.log('Form fields:', fields);
          console.log('Uploaded files:', files); // Log uploaded files

          const file = files.profilePhoto; // Assuming the input name is 'profilePhoto'

          if (!file) {
            console.log('No file uploaded!');
            return res.status(400).json({ message: 'No file uploaded' });
          }

          // Ensure we're working with a single file
          const filePath = file[0] ? file[0].filepath : file.filepath;
          const newFilePath = path.join(form.uploadDir, `${Date.now()}_${file[0] ? file[0].originalFilename : file.originalFilename}`);

          // Rename and move the file
          fs.renameSync(filePath, newFilePath);

          // Update the user's profile photo URL
          user.photo = `/uploads/${path.basename(newFilePath)}`;
          await user.save();

          // Respond with the updated photo URL
          return res.status(200).json({
            message: 'Photo uploaded successfully',
            profilePhoto: user.photo,
          });
        });

      } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }

  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
