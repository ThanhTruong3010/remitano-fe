import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.css";

export const Share = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");

  const shareVideo = async (url: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios({
        method: "POST",
        url: `${import.meta.env.VITE_BACKEND_URL}/videos`,
        data: { url },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTimeout(() => navigate("/"), 1000);
      toast.success("Share successfully!");
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };

  return (
    <>
      <div className="share-component">
        <input
          type="text"
          placeholder="Enter an URL"
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="share-button" onClick={() => shareVideo(url)}>
          Share
        </button>
      </div>
    </>
  );
};
