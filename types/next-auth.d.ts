import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name: string;
    user_type: string;
    full_name: string;
  }

  interface Session {
    user: User & DefaultSession['user'];
  }
  interface CredentialsInputs {
    email: string;
    password: string;
  }
}
