import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

export const nextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
