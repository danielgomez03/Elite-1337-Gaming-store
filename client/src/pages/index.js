import React, { useEffect, useState } from 'react'
import Products from './guest/Products'
import { useSession, signIn, signOut } from "next-auth/react"
import axios from 'axios';


function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        // Realizar la solicitud al backend para obtener la sesión
        const response = await axios.get('http://localhost:3001/login/session');

        console.log("getsession", session)
        // Obtener los datos de la sesión desde la respuesta del backend
        const sessionData = response.data;

        // Guardar los datos de la sesión en el estado del componente
        setSession(sessionData);
      } catch (error) {
        console.error('Error al obtener la sesión:', error);
      }
    };

    fetchSession();
  }, []);
  
  /* const { data: session, status } = useSession() */

  console.log("sessionIndex", session)/* 
  console.log("status", status); */

  const existPass = session?.passport ? true : false;
  
/* if (status === "loading") return <p>loading...</p> */

  if(existPass) {
    return <>
      Signed in as {session.passport} <br/>
      <button onClick={() => signOut()}>Sign out</button>
      
      <Products/>
    </>
  }
  return <>
    Not signed in <br/>
    <button onClick={() => signIn()}>Sign in</button>
    
    <Products/>
  </>
}

export default Home
