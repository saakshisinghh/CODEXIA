import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'

function App() {
  return (
    
     <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/problem" element={<div>PROBLEM PAGE</div>} />
      </Routes>
    
  )  
}

export default App
