import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Test from './test.jsx'
import './test.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Test />
  </StrictMode>,
)
