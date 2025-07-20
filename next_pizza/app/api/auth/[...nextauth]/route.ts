import { prisma } from '@/prisma/prisma-client';
import { UserRole } from '@prisma/client';
import { compare, hashSync } from 'bcrypt';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';


export const nextAuthOptions:AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.id,
          email: profile.email,
          name: profile.name || profile.login,
          image: profile.avatar_url,
          role: 'USER' as UserRole, // Default role, can be changed later
        };
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Enter your email' },
        password: { label: 'Password', type: 'password', placeholder: 'Enter your password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const values = {
          email: credentials.email,
        };

        const findUser = await prisma.user.findFirst({
          where: values,
        });

        if (!findUser) {
          return null;
        }

        const isPasswordValid = await compare(credentials.password, findUser.password);

        if (!isPasswordValid) {
          return null;
        }
        if (!findUser.verified) {
          return null;
        }
        return {
          id: findUser.id,
          email: findUser.email,
          name: findUser.fullName,
          role: findUser.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({user,account}){
      if (!user || !account) {
        return false; // Prevent sign-in if user or account is not available
      }
      try {
        if (account.provider === 'credentials'){
          return true
        }

        if(!user.email){
          return false; // Prevent sign-in if email is not available

        }

        const findUser = await prisma.user.findFirst({
          where:{
            OR:[
              {provider:account?.provider,providerId:account?.providerAccountId},
              {email:user.email}
            ]
          }
        })
        if (findUser){
          await prisma.user.update({
            where:{
              id: findUser.id,
            },
            data:{
              provider: account?.provider,
              providerId: account?.providerAccountId,
            }
          })
          return true; // Allow sign-in if user exists and provider is updated
        }

        await prisma.user.create({
          data:{
            email:user.email,
            fullName: user.name || 'User #' + user.id,
            password:hashSync(user.id.toString(),10),
            verified:new Date(),
            provider: account?.provider,
            providerId: account?.providerAccountId,
          }
        })
        return true; // Allow sign-in if new user is created

      } catch (error) {
        console.error('Error during signIn callback:', error);
        return false; // Return false to prevent sign-in
        
      }
    },
    async jwt({ token }) {
      if(!token.email) {
        return token; // Return token as is if email is not available
      }
      const findUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });
      if (findUser) {
        token.id = String(findUser.id);
        token.role = findUser.role;
        token.email = findUser.email;
        token.FullName = findUser.fullName;
      }
      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
