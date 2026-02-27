import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ServiceDetail from "./pages/ServiceDetail";
import DynamicPage from "./pages/DynamicPage";
import Calculators from "./pages/Calculators";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import SecretAdmin from "./pages/SecretAdmin";
import Contact from "./pages/Contact";
import ContentMap from "./pages/ContentMap";
import WhatsAppButton from "./components/WhatsAppButton";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hizmet/:slug" element={<ServiceDetail />} />
          <Route path="/detay/:slug" element={<DynamicPage />} />
          <Route path="/hesaplama-araclari" element={<Calculators />} />
          <Route path="/blog/:category" element={<Blog />} />
          <Route path="/blog/:category/:slug" element={<BlogPost />} />
          <Route path="/iletisim" element={<Contact />} />
          <Route path="/icerik-haritasi" element={<ContentMap />} />
          <Route path="/admin-panel-mir" element={<SecretAdmin />} />
        </Routes>
      </Layout>
      <WhatsAppButton />
    </Router>
  );
}
