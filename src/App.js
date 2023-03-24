import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Header from "./components/navigation/Header";
import Sequencer from "./components/sequencer/Sequencer";
import '@sweetalert2/theme-dark/dark.css';
import {createTheme, ThemeProvider} from "@mui/material";

function App() {
  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: 'Nunito, sans-serif',
        fontSize: 16,
      },
    }
  });

  // Create new query client instance
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Header />
          <Sequencer />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            theme="dark"
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
