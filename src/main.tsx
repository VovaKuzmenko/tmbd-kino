import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-loading-skeleton/dist/skeleton.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { AppErrorBoundary } from './components/error-boundary/AppErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppErrorBoundary>
          <App />
        </AppErrorBoundary>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)