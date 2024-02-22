import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "../../../../../lib/dbconnect";
import User from "../../../../../models/User";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }:any) {
      const sessionUser= await User.findOne({ email: session.user.email });
      return session;
    },
    async signIn({ profile }: any) {
      console.log(profile);
      try {
        await connectDB();
        const userExist = await User.findOne({ email: profile.email });
        if (!userExist) {
          const user = await User.create({
            name: profile.name,
            email: profile.email,
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
