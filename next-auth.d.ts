import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      playerAlias: string;
    } & DefaultSession['user'];
  }
}
