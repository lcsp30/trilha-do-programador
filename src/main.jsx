import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'
import './styles/index.css'
import EditorCodigo from './pages/EditorCodigo/EditorCodigo.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <EditorCodigo/>,
  },
],{
  basename: "/trilha-do-programador"
});

createRoot(document.getElementById('root')).render(
 <RouterProvider router={router}/>
)
