import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Allbooks from './pages/Allbooks';
import NewBook from './pages/NewBook';
import Neighborhood from './pages/Neighborhood';
import BookDetail from './pages/BookDetail';
import ProtectedRoute from './pages/ProtectedRoute';
import BookChats from './pages/BookChats';
import BookChat from './pages/BookChat';
import Setting from './pages/Setting';
import SellBook from './pages/SellBook';
import SearchBook from './pages/SearchBook';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Home /> },
      { path: '/books', element: <Allbooks /> },
      { path: '/books/:id', element: <BookDetail /> },
      { path: '/books/search', element: <SearchBook /> },
      {
        path: '/books/new',
        element: (
          <ProtectedRoute>
            <NewBook />
          </ProtectedRoute>
        ),
      },
      {
        path: '/neighborhood',
        element: (
          <ProtectedRoute>
            <Neighborhood />
          </ProtectedRoute>
        ),
      },
      {
        path: '/chats/:id',
        element: (
          <ProtectedRoute>
            <BookChats />
          </ProtectedRoute>
        ),
      },
      {
        path: '/chat/:id',
        element: (
          <ProtectedRoute>
            <BookChat />
          </ProtectedRoute>
        ),
      },
      {
        path: '/setting',
        element: (
          <ProtectedRoute>
            <Setting />
          </ProtectedRoute>
        ),
      },
      {
        path: '/setting/sell',
        element: (
          <ProtectedRoute>
            <SellBook />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

