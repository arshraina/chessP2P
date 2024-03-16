import "./App.css";
import Dash from "./pages/dash";
import { ThemeProvider } from "./components/theme-provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import { Toaster } from "@/components/ui/toaster";
import { useSelector } from "react-redux";
import LogIn from "./pages/LogIn";
import Game from "./pages/game";

function App() {
  const [isSuccessful, isErrored, isLoading, isLogged, user] = useSelector(
    (state) => [
      state.user.isSuccessful,
      state.user.isErrored,
      state.user.isLoading,
      state.user.isLogged,
      state.user.user,
    ]
  );

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={isLogged ? <Dash /> : <Dash />} />
          <Route path="/friends" element={<div>Friends</div>} />
          <Route path="/arena" element={<div>Arena</div>} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
