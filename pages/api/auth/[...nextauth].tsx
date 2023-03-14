import NextAuth, { NextAuthOptions } from 'next-auth'
import { Provider } from 'next-auth/providers'
import GoogleProvider from 'next-auth/providers/google'

const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }) as Provider,
    // ...add more providers here
  ],
  pages: {
    signIn: '/auth/signin',
  },
}

export default NextAuth(authOptions)
