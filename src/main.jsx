// External Dependencies
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Internal Dependencies
import App from './App.jsx'

// Local Variables
// export const queryClient = new QueryClient(); 
// The previous line by itself is perfectly acceptable to get started, 
// but some simple default settings can be altered to better fit your project.
// This link will break down what and how to make those adjustments as I use in the next example
// https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults 


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // Duration befor inactive queries are removed from the cache. ** Defaults to 5 minutes **
      staleTime: 1000 * 60 * 60 * 24, // Duration of when data will be read directly from the cache with no new requests
      // refetchInterval: 1000 * 60 * 15 // How quickly/often refetches occur behind-the-scenes
    }, 
  }, // 1000 Milliseconds * 60 Seconds * 60 Minutes * 24 Hours === This formula keeps data "fresh" and readily available in cache for an entire day
}); 

// The only difference between queryClient on line 18 as opposed to line 18 is that
// I have adjusted the time that queries are considered stale and triggered to refetch
// Again, see the above link to read more on this

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
