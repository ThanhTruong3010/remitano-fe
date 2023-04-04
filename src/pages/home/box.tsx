import "./style.css";
import { Videos } from "./types";

export const Box = ({ title, userEmail, description, url }: Videos) => {
  return (
    <div className="box">
      <div className="left">
        <iframe
          width="300"
          height="200"
          src={url}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
      <div className="right">
        <h3 className="title">{title}</h3>
        <p>
          Shared by: <b>{userEmail}</b>
        </p>
        <p>Description:</p>
        <p>{description.slice(0, 100)}...</p>
      </div>
    </div>
  );
};
