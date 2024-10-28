import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../src/firebase/config'

import { DefaultSession, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id: string
      uid: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    uid: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid: string
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
    newUser: '/Create-account'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
        password: { label: 'Password', type: 'password' },
        action: { label: 'Action', type: 'text' }
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required')
        }
        try {
          if (credentials?.action === 'signup') {
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              credentials.email,
              credentials.password
            )
            return {
              id: userCredential.user.uid,
              email: userCredential.user.email,
              uid: userCredential.user.uid
            }
          } else {
            const userCredential = await signInWithEmailAndPassword(
              auth,
              credentials.email,
              credentials.password
            )
            return {
              id: userCredential.user.uid,
              email: userCredential.user.email,
              uid: userCredential.user.uid
            }
          }
        } catch (error) {
          console.error('Error during authentication:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.uid
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.uid = token.uid
      }
      return session
    }
  }
}

export default NextAuth(authOptions)