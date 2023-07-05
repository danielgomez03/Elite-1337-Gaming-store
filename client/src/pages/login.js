import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const handleSignIn = async () => {
    const result = await signIn('Credentials', { 
      username: 'ignaciofosco@example.com', 
      password: 'asd123',
      callbackUrl: `${window.location.origin}/profile`, // Ruta de retorno después de iniciar sesión
    });
    console.log(result);
  };
  

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}
