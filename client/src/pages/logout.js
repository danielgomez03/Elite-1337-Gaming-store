import { signOut } from 'next-auth/react';

export default function LogoutPage() {
  const handleSignOut = async () => {
    const result = await signOut();
    console.log(result);
  };

  return (
    <div>
      <h1>Logout Page</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
