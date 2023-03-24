import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Provider as ReduxProvider } from "react-redux"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { AppRouter } from "./routers/AppRouter"
import { store } from "./store"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
    },
  },
})

const App = () => {
  return (
    <div>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
          <ToastContainer position="bottom-left" closeOnClick={false} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ReduxProvider>
    </div>
  )
}

export default App
