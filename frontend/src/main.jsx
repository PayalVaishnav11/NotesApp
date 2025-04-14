import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from '../src/store/store.js'

import {createBrowserRouter , RouterProvider} from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import Login from './pages/Login/Login.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element:<Login/>,
  },
  {
    path: "/dashboard",
    element: <Home />,
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<SignUp/>
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store = {store}>
        <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
