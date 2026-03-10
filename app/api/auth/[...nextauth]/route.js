import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET || "super_secret_dev_key",
    callbacks: {
        async signIn({ user }) {
            // White-list the specific user email
            if (user.email === "contato.filipemachado@gmail.com") {
                return true;
            } else {
                return false; // Blocks anyone else
            }
        },
    },
    pages: {
        signIn: '/login', // Custom login page
        error: '/login', // Return to login if error (e.g. unauthorized email)
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
