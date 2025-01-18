import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import  React from 'react'

export default function App() {
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  )
}