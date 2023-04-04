import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./style.css";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("info");
    setIsLogin(false);
    toast.success("Logout seccessfully!");
    navigate("/");
  };

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_BACKEND_URL}/auth/sign-in`,
        data: { email, password },
      });
      toast.success("Login successfully!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("info", JSON.stringify(data.data));
      setIsLogin(true);
    } catch (e: any) {
      setIsLogin(false);
      toast.error(e.response.data.message);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const a = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_BACKEND_URL}/auth/sign-up`,
        data: { email, password },
      });
      login(email, password);
      toast.success("Register successfully!");
    } catch (e: any) {
      setIsLogin(false);
      toast.error(
        Array.isArray(e.response.data.message)
          ? e.response.data.message[0]
          : e.response.data.message
      );
    }
  };

  const renderForm = () => {
    if (isLogin) {
      const info: any = JSON.parse(localStorage.getItem("info") as string);
      return (
        <div className="form">
          <p>
            Welcome <b>{info.email || "noname"}</b>
          </p>
          <button className="form-button" onClick={() => navigate("/share")}>
            Share a movie
          </button>
          <button className="form-button" onClick={logout}>
            Logout
          </button>
        </div>
      );
    }

    return (
      <div className="form">
        <input
          type="text"
          name="email"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="form-button" onClick={(e) => login(email, password)}>
          Login
        </button>
        <button
          className="form-button"
          onClick={(e) => signUp(email, password)}
        >
          Signup
        </button>
      </div>
    );
  };

  return (
    <div className="header">
      <h2>Funny Movies</h2>
      {renderForm()}
    </div>
  );
};
