import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Homme from "./pages/Homme";
import Femme from "./pages/Femme";
import Metiers from "./pages/Metiers";
import Marques from "./pages/Marques";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/homme" element={<Homme />} />
        <Route path="/femme" element={<Femme />} />
        <Route path="/metiers" element={<Metiers />} />
        <Route path="/marques" element={<Marques />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;