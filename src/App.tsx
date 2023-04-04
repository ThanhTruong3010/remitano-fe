import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { HomePage } from "./pages/home";
import { Header } from "./components/headers";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Share } from "./pages/share";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <hr />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/share"
          element={
            <PrivateRoute>
              <Share />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

function PrivateRoute({ children }: any) {
  const token = localStorage.getItem("token");
  return !!token ? children : <Navigate to="/" />;
}

export default App;
