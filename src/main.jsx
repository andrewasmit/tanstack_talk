// External Dependencies
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Internal Dependencies
import App from './App.jsx'

// Local Variabels
// export const queryClient = new QueryClient(); 
// The next line by itself is perfectly acceptable to get started, 
// but these defaults can be altered to better fit your project.
// This link will break down what and how to make those adjustments as I use in the next example
// https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults 


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 60 * 24,
    },
  },
});
// The only difference between queryClient on line 18 as opposed to line 18 is that
// I have adjusted the time that queries are considered stale and triggered to refetch
// 1000 Milliseconds * 60 Seconds * 60 Minutes * 24 Hours === This formula keeps data "fresh" for an entire day
// Again, see the above link to read more on this

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
