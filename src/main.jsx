import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BookContextProvider } from './book-context';

createRoot(document.getElementById('root')).render(
  <BookContextProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </BookContextProvider>,
)
