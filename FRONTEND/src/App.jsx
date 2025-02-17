import { useEffect, useState } from "react";

import "./App.css";
import Navbar from "./Component/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignupPage from "./Pages/SignupPage";
import SigninPage from "./Pages/SigninPage";
import SettingsPage from "./Pages/SettingPage";
import ProfilePage from "./Pages/ProfilePage";
import { useAuthStore } from "./Store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./Store/UseThemeStore";
function App() {
  const [count, setCount] = useState(0);

  const { authuser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  useEffect(() => {
    checkAuth(); // Ensure `checkAuth` is being called inside a valid hook
  }, []);

  if (isCheckingAuth && !authuser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"></Loader>
      </div>
    );

  return (
    <>
      {" "}
      <div data-theme={theme}>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={authuser ? <HomePage /> : <Navigate to="/signup" />}
          />
          <Route
            path="/signup"
            element={!authuser ? <SignupPage /> : <Navigate to="/" />}
          />

          <Route
            path="/signin"
            element={!authuser ? <SigninPage /> : <Navigate to="/" />}
          />
          <Route path="/setting" element={<SettingsPage />} />
          <Route
            path="/profile"
            element={authuser ? <ProfilePage /> : <Navigate to="/signup" />}
          />
        </Routes>

        <Toaster />
      </div>
    </>
  );
}

export default App;
