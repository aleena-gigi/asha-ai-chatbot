import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's unique identifier */
      id: string;
      /** Whether the user has completed their profile */
      profileComplete: boolean;
    } & DefaultSession["user"];
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    /** Whether the user has completed their profile */
    profileComplete?: boolean;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
interface JWT  {
    /** The user's unique identifier */
    email?: string | null;
    /** Whether the user has completed their profile */
    profileComplete?: boolean | false;
  }

}

declare module "jwt-decode" {
  export interface JwtPayload {
    profileComplete?: boolean;
  }
}
