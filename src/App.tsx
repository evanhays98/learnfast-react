import React from 'react';
import { HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppRouter } from './Pages/AppRouter';
import { PageBackground, ToastContainer } from './libs/core';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <PageBackground />
        <ToastContainer />
        <AppRouter />
      </HashRouter>
    </QueryClientProvider>
  );
}

export default App;
