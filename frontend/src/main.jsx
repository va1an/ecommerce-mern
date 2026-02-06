import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              fontFamily: "Inter",
              borderRadius: "10px",
            },
            success: {
              style: {
                background: "#22c55e",
                color: "#ffffff",
              },
            },
            error: {
              style: {
                background: "#ef4444",
                color: "#ffffff",
              },
            },
          }}
        />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
