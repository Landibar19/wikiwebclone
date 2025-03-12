import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/Users';
import bcrypt from 'bcryptjs';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        await dbConnect();

        const user = await User.findOne({ username: credentials.username });
        if (!user) {
          throw new Error('No user found with the username');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Invalid password');
        }

        return { id: user._id, username: user.username, email: user.email, photo: user.photo };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.username;
      session.user.image = token.photo;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.photo = user.photo;
      }
      return token;
    },
  },
  pages: {
    signIn: '/user/signin',
  },
  secret: process.env.JWT_SECRET,
});