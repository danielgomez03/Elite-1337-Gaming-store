import Link from "next/link";
import React from "react";
import CardsContainer from "./components/cardsContainer";



export default function Home() {
  return (
    <main>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <Link href="/createProduct">
               Create a Product
        </Link>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] ">
       
        <CardsContainer></CardsContainer>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        
     <CardsContainer></CardsContainer>
      

      

        
      </div>
    </main>
  )
}
