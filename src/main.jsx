import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'
import './index.css'
import App from './pages/App.jsx'
import EditorCodigo from './pages/EditorCodigo.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path:"codigos",
    element:<EditorCodigo/>,
  },
]);

createRoot(document.getElementById('root')).render(
 <RouterProvider router={router}/>
)
