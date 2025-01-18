import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import React from 'react'
import './index.css'

export default function App() {
  return (
    <div className="bg-[url('/public/images/bgImage.jpg')] bg-cover w-screen h-screen">
      <header className="text-center">
        <div className="flex flex-col items-center justify-center pt-24">
          <h1 className="text-7xl font-bold font-lora text-black">Campus Chronicles</h1>
          <img 
            src="/public/images/cc-logo.png" 
            alt="Campus Chronicles Logo" 
            className="w-21 h-21s mt-10 animate-flip"
          />
        </div>
        <SignedOut>
          <SignInButton>
            <button className="mt-16 py-6 px-9 mb-4 font-lora bg-black rounded-xl hover:bg-slate-500 text-white ease-in-out duration-300">
              Login
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </div>
  )
}