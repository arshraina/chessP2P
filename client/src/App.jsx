import "./App.css";
import Dash from "./pages/dash";
import { ThemeProvider } from "./components/theme-provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dash />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
