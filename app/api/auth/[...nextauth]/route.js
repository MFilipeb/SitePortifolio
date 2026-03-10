import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "missing",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "missing",
        }),
        CredentialsProvider({
            name: "Acesso Admin",
            credentials: {
                username: { label: "Usuário", type: "text" },
                password: { label: "Senha", type: "password" }
            },
            async authorize(credentials) {
                // Specific credentials requested by the user
                if (credentials?.username === "FilipeMachado" && credentials?.password === "Fernanda01!") {
                    return { id: "1", name: "Filipe Machado", email: "contato.filipemachado@gmail.com" };
                }
                return null;
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET || "super_secret_dev_key",
    callbacks: {
        async signIn({ user, account }) {
            // If using credentials, we already checked the password
            if (account.provider === "credentials") {
                return true;
            }
            // White-list the specific user email for Google
            if (user.email === "contato.filipemachado@gmail.com") {
                return true;
            } else {
                return false; // Blocks anyone else
            }
        },
    },
    pages: {
        signIn: '/login',
        error: '/login',
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
