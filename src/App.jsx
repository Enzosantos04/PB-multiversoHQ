import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ComicsProvider } from "./context/ComicsContext";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import CatalogPage from "./pages/CatalogPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <ComicsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contato" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </ComicsProvider>
  );
}

export default App;
