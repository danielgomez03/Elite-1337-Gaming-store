/* import NextAuth from 'next-auth'
import axios from 'axios';
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    // Realiza una solicitud al backend para autenticar al usuario
                    const response = await axios.post('http://localhost:3001/login/signin', credentials);

                    if (response.status === 200 && response.data) {
                        // La autenticación fue exitosa, devuelve el objeto de usuario
                        return response.data;
                    } else {
                        // La autenticación falló, devuelve null
                        return null;
                    }
                } catch (error) {
                    console.error('Error de autenticación:', error);
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        EmailProvider({
            server: process.env.MAIL_SERVER,
            from: 'NextAuth.js <no-reply@example.com>'
        }),
    ]
    callbacks: {
        async session(session, user) {
            // Agrega propiedades personalizadas a la sesión
            session.user.id = user.id;
            return session;
        },
    },
});  */