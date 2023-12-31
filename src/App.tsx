import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthProvider from './context/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ChatProvider from './context/ChatProvider';
import Footer from './components/Footer';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChatProvider>
          <div className='pb-12'>
            <Navbar />
            <Outlet />
          </div>
          <Footer />
        </ChatProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

