import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthProvider from './context/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ChatProvider from './context/ChatProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChatProvider>
          <Navbar />
          <Outlet />
        </ChatProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

