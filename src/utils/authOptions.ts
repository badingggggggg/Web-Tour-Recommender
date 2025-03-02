import bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/User';

interface UserCredentials {
  email: string;
  password: string;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        try {
          const { email, password } = credentials as UserCredentials;

          // Find user by email
          const user = await User.findEmail(email);
          if (!user) {
            throw new Error('Invalid credentials');
          }

          // Compare password
          const isValidPassword = await bcrypt.compare(password, user.password);
          if (!isValidPassword) {
            throw new Error('Invalid credentials');
          }

          return {
            id: user.id,
            user_type: user.user_type,
            full_name: user.full_name,
            email: user.email
          } as any;
        } catch (error: any) {
          console.error('Error: ', error.message);
          throw new Error(error.message);
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.user_type = user.user_type;
        token.full_name = user.full_name;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user = {
          id: token.id,
          user_type: token.user_type,
          full_name: token.full_name,
          email: token.email
        };
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login'
  }
};
