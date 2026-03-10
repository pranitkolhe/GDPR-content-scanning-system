import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Scan from "./pages/Scan";
import Dashboard from "./pages/Dashboard";
// import Rules from "./pages/Rules";
// import Violations from "./pages/Violations";

export default function App() {

  return (

  <BrowserRouter>

    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between">

      <div className="font-bold">
        <Link to="/" className="hover">
          GDPR Scanner
        </Link>
      </div>

      <div className="flex gap-6">

        <Link to="/" className="hover:underline">
          Home
        </Link>

        <Link to="/scan" className="hover:underline">
          Scan
        </Link>

        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>

        {/* <Link to="/rules" className="hover:underline">
          Rules
        </Link> */}

      </div>

    </nav>


    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/scan" element={<Scan />} />

      <Route path="/dashboard" element={<Dashboard />} />

      {/* <Route path="/rules" element={<Rules />} /> */}

      {/* <Route path="/scan/:id" element={<Violations />} /> */}

    </Routes>

  </BrowserRouter>

  );

}