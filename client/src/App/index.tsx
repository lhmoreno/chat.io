import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Login } from '../pages/Login'
import { Chat } from '../pages/Chat'

import './styles.css'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/"
          element={<Login />}
        />

        <Route 
          path="/chat"
          element={<Chat />}
        />
      </Routes>
    </BrowserRouter>
  )
}
