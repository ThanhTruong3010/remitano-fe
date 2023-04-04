import axios from "axios";
import { useEffect, useState } from "react";
import { Box } from "./box";
import "./style.css";
import { Meta, Videos } from "./types";

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState<Videos[]>([]);
  const [meta, setMeta] = useState<Meta>({
    currentPage: 1,
    itemCount: 1,
    itemsPerPage: 3,
    totalItems: 1,
    totalPages: 1,
  });

  useEffect(() => {
    getVideos(1);
  }, []);

  const getVideos = async (page: number) => {
    setIsLoading(true);
    const { data } = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_BACKEND_URL}/videos?page=${page}&limit=3`,
    });
    setIsLoading(false);
    const items = videos.concat(data.items);
    setVideos(items);
    setMeta(data.meta as Meta);
  };

  return (
    <div className="wrapper">
      {videos?.map((item) => (
        <Box
          title={item.title}
          userEmail={item.userEmail}
          description={item.description}
          url={item.iframeUrl || item.url}
        />
      ))}
      {meta.totalItems > 3 && videos.length < meta.totalItems && (
        <button
          disabled={isLoading}
          className="loadMore"
          onClick={() => getVideos(meta.currentPage + 1)}
        >
          Load More
        </button>
      )}
    </div>
  );
};
