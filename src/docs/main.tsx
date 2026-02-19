import { Analytics } from '@vercel/analytics/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastProvider } from './components/Toast'
import { Sandbox } from './Sandbox'
import '../index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ToastProvider>
            <Sandbox />
            <Analytics />
        </ToastProvider>
    </StrictMode>
)
