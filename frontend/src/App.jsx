import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Scan from "./pages/Scan";
import Dashboard from "./pages/Dashboard";
import Rules from "./pages/Rules";
import Violations from "./pages/Violations";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/scan"       element={<Scan />} />
            <Route path="/dashboard"  element={<Dashboard />} />
            <Route path="/rules"      element={<Rules />} />
            <Route path="/scan/:id"   element={<Violations />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}