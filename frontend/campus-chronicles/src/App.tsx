import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './index.css'
import HomePage from './HomePage';

export default function App() {
  const { isSignedIn } = useUser();


  return (
    <Router>
      <Routes>
        <Route path="/" element={
    <div className="bg-[url('/public/images/bgImage.jpg')] bg-cover w-screen h-screen">
      <header className="text-center">
        <div className="flex flex-col items-center justify-center pt-8">
          <h1 className="text-7xl font-bold font-lora text-black">Campus Chronicles</h1>
          <img 
            src="images/cc-logo.png" 
            alt="Campus Chronicles Logo" 
            className="w-21 h-21s smt-10 animate-flip mt-4"
          />
        </div>
        <SignedOut>
          <SignInButton >
            <button className="mt-16 py-6 px-9 mb-4 font-lora bg-black rounded-xl hover:bg-white text-white hover:text-black ease-in-out duration-300">
              Login
            </button>
          </SignInButton>
        </SignedOut >
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </header>
    </div>
        } />
    <Route path="/homepage" element={<HomePage />} />
    </Routes>
    </Router>
  )
}