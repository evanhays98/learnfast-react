import React from 'react';
import { HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppRouter } from './Pages/AppRouter';
import { PageBackground, ToastContainer } from './libs/core';
import ScrollToRefresh from './libs/core/ScrollToRefresh';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <PageBackground />
        <ToastContainer />
        <AppRouter />
        <ScrollToRefresh />
      </HashRouter>
    </QueryClientProvider>
  );
}

export default App;
