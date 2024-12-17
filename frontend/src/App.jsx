import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import SettingPage from "./pages/settingPage";
import ProfilePage from "./pages/profilePage";
import HomePage from "./pages/homePage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { RiLoader2Line } from "react-icons/ri";
import { Navigate } from "react-router-dom";
import SingePageChat from "./pages/SingePageChat";

export default function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <RiLoader2Line className="animate-spin text-primary" size={50} />
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Toaster />

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/Login" />}
        />
        <Route
          path="/Login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/Register"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/Profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/Login" />}
        />
        <Route
          path="/Setting"
          element={authUser ? <SettingPage /> : <Navigate to="/Login" />}
        />
        <Route path="/chat/:slug" element={<SingePageChat />} />
      </Routes>
    </BrowserRouter>
  );
}
