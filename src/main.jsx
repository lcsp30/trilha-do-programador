import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'
import './styles/index.css'
import EditorCodigo from './pages/EditorCodigo/EditorCodigo.jsx';
import Login from './pages/Login/Login.jsx';
import Niveis from './pages/Niveis/Niveis.jsx';
import Trilha from './pages/Trilha/Trilha.jsx';


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/editor",
    element: <EditorCodigo/>,
  },
  {
    path: "/niveis",
    element: <Niveis/>,
  },
  {
    path: "/trilha/brasil",
    element: <Trilha/>,
  },
],{
  basename: "/trilha-do-programador"
});

createRoot(document.getElementById('root')).render(
 <RouterProvider router={router}/>
)
