import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ComicsProvider } from "./context/ComicsContext";
import ScrollToTop from "./utils/ScrollToTop";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import CatalogPage from "./pages/CatalogPage";
import ContactPage from "./pages/ContactPage";
import PlanosPage from "./pages/PlanosPage";
import CarrinhoPage from "./pages/CarrinhoPage";
import TermosDeUsoPage from "./pages/TermosDeUsoPage";
import RegulamentosPage from "./pages/RegulamentosPage";
import PrivacidadePage from "./pages/PrivacidadePage";
import SobrePage from "./pages/SobrePage";
import TrabalheConoscoPage from "./pages/TrabalheConoscoPage";
import FormasPagamentoPage from "./pages/FormasPagamentoPage";
import TrocasDevolucoesPage from "./pages/TrocasDevolucoesPage";
import FAQPage from "./pages/FAQPage";
import ComicDetailPage from "./pages/ComicDetailPage";
import RegisterPage from "./pages/RegisterPage"
import MinhaContaPage from "./pages/MinhaContaPage";

function App() {
  return (
  
    <ComicsProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/planos" element={<PlanosPage />} />
          <Route path="/carrinho" element={<CarrinhoPage />} />
          <Route path="/termos-de-uso" element={<TermosDeUsoPage />} />
          <Route path="/regulamentos" element={<RegulamentosPage />} />
          <Route path="/privacidade" element={<PrivacidadePage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/trabalhe-conosco" element={<TrabalheConoscoPage />} />
          <Route path="/formas-pagamento" element={<FormasPagamentoPage />} />
          <Route path="/trocas-devolucoes" element={<TrocasDevolucoesPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/quadrinho/:id" element={<ComicDetailPage />} />
          <Route path="/cadastro" element={<RegisterPage/>} />
           <Route path="/minhaConta" element={<MinhaContaPage/>} />
        </Routes>
      </BrowserRouter>
    </ComicsProvider>
  );
}

export default App;
