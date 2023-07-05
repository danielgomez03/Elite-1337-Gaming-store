// next-auth.d.ts
import { Session } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    customProperty: string;
  }
}
