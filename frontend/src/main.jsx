import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DeviceProvider } from './contexts/DeviceContext.jsx'
import { PresetProvider } from './contexts/PresetContext.jsx'
import { ToastContainer } from 'react-toastify'
import { SidebarProvider } from './contexts/SidebarContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <DeviceProvider>
        <PresetProvider>
          <SidebarProvider>
            <App />
          </SidebarProvider>
          <ToastContainer position="top-center" theme='dark' autoClose={3000} hideProgressBar limit={1} />
        </PresetProvider>
      </DeviceProvider>
    </DndProvider>
  </StrictMode>,
)
