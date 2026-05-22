import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import AnalystNavbar from "./components/AnalystNavbar";
import Footer from "./components/Footer";
import Breadcrumb from "./components/Breadcrumb";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Scan from "./pages/Scan";
import Dashboard from "./pages/Dashboard";
import Rules from "./pages/Rules";
import Violations from "./pages/Violations";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthRedirect from "./pages/AuthRedirect";
import AnalystDashboard from "./pages/AnalystDashboard";
import AccessDenied from "./pages/AccessDenied";

function AppContent() {

  const location = useLocation();

  // Analyst pages
  const analystRoutes = [
    "/analyst-dashboard",
    "/violations",
  ];

  const isAnalystPage =
    analystRoutes.includes(location.pathname);

  return (

    <div className="flex flex-col min-h-screen">

      {/* CONDITIONAL NAVBAR */}

      {isAnalystPage ? (
        <AnalystNavbar />
      ) : (
        <Navbar />
      )}

      <Breadcrumb />

      <main className="flex-1">

        <Routes>

          {/* PUBLIC ROUTES */}

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/auth-redirect"
            element={<AuthRedirect />}
          />

          <Route
            path="/access-denied"
            element={<AccessDenied />}
          />

          {/* ADMIN ROUTES */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/scan"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Scan />
              </ProtectedRoute>
            }
          />

          <Route
            path="/rules"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Rules />
              </ProtectedRoute>
            }
          />

          <Route
            path="/scan/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Violations />
              </ProtectedRoute>
            }
          />

          {/* ANALYST ROUTES */}

          <Route
            path="/analyst-dashboard"
            element={
              <ProtectedRoute allowedRoles={["analyst"]}>
                <AnalystDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/violations"
            element={
              <ProtectedRoute allowedRoles={["analyst"]}>
                <Violations />
              </ProtectedRoute>
            }
          />

        </Routes>

      </main>

      <Footer />

    </div>

  );

}

export default function App() {

  return (

    <BrowserRouter>

      <AppContent />

    </BrowserRouter>

  );

}