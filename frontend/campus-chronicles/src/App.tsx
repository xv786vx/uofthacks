import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import  React from 'react'
import './index.css'


export default function App() {
  return (
    <div className="w-screen h-screen bg-red-500">
      <header className="text-center">
        <h1 className="pt-32 text-7xl font-bold mb-8 text-white">Campus Chronicles</h1>
        <SignedOut>
          <SignInButton>
            <button className="py-4 px-6 mt-48 mb-4 bg-black rounded-xl hover:bg-white text-white hover:text-black ease-in-out duration-300">
              Sign In dude
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