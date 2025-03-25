import React, { useState } from "react";
import { BsDot } from "react-icons/bs";

const VideoCard = ({ video }) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="flex flex-col gap-3 cursor-pointer">
      <div className="relative aspect-video rounded-xl overflow-hidden hover:rounded-none" onClick={() => setShowVideo(true)}>
        {showVideo ? (
          <iframe
            src={`https://www.youtube.com/embed/${video?.id}`}
            title={video?.title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={video?.thumbnail || "https://placehold.co/320x180"}
              alt={video?.title}
              className="w-full h-full object-cover"
            />
          </>
        )}
      </div>
      <div className="flex gap-3">
        <div className="min-w-[36px] min-h-[36px] w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={video?.channelThumbnail || "https://placehold.co/36x36"}
            alt={video?.channelName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="font-medium line-clamp-2">
            {video?.title || "Video Title"}
          </h3>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>{video?.channelName || "Channel Name"}</p>
            <div className="flex items-center">
              <span>{video?.views || "0"} views</span>
              <BsDot className="mx-1" />
              <span>{video?.uploadedAt || "0 hours ago"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
