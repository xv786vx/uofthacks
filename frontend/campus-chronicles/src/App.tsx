import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import  React from 'react'
import './index.css'


export default function App() {
  return (
    <div className="w-screen h-screen bg-red-500">
      <header className="text-center">
        <h1 className="pt-32 text-7xl font-bold mb-8">Campus Chronicles</h1>
        <SignedOut>
          <SignInButton>
            <button className="mt-48 px-24 py-16 bg-neutral-500 text-white text-4xl rounded-lg hover:bg-blue-600">
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