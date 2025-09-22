import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import CategoryPage from "./pages/CategoryPage";
import CartItem from "./components/CartItem";
import AnalyticsTabs from "./components/AnalyticsTabs";

function App() {
  const { checkAuth, user, isCheckingAuth } = useUserStore();

  useEffect(() => {
    console.log('App - Initial auth check');
    checkAuth();
  }, [checkAuth]);

  // Debug logging
  useEffect(() => {
    console.log('App - Auth state changed:', {
      user: user ? { id: user.id, role: user.role } : null,
      isCheckingAuth
    });
  }, [user, isCheckingAuth]);


  return (
    <div className="min-h-screen bg-gradient-to-l from-blue-200 to-white overflow-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/secret-dashboard"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        					<Route path='/category/:category' element={<CategoryPage />} />
                     <Route path="/cart" element={<CartItem />} />
                     <Route path="/analytics" element={<AnalyticsTabs/>} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
