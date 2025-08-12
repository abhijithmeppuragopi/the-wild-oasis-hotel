import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";
import { se } from "date-fns/locale";
 
export const { handlers:{GET,POST}, signIn, signOut, auth } = NextAuth({
  providers: [Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
  })],
  callbacks:{
    authorized({auth,request}) {
      return !!auth?.user;
    },
    async signIn({user,account,profile}) {
      try{
      const existingUser= await getGuest(user.email);
      if(!existingUser){
        console.log("Creating new guest", user);
        await createGuest({fullName:user.name, email:user.email});
        console.log("New guest created");
      }
      return true;
    }
    catch{
      console.error("Error during sign in:", error);
      return false;
    }
  },
async session({session,user}) {
  const guest=await getGuest(session.user.email);
  session.user.guestId=guest.id;
  return session;
}},
  pages: {
    signIn: "/login",
  },
})