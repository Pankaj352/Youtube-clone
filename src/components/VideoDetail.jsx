import React from 'react';
import { BiLike, BiDislike } from 'react-icons/bi';
import { RiShareForwardLine } from 'react-icons/ri';
import { BsThreeDots } from 'react-icons/bs';

const VideoDetail = ({ video }) => {
  const {
    title,
    channelTitle,
    channelThumbnail,
    views,
    uploadedAt,
    likeCount,
    description
  } = video;

  return (
    <div className="max-w-[1280px] mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-grow">
          <div className="aspect-video bg-black rounded-xl overflow-hidden">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${video.id}`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          
          <div className="mt-4">
            <h1 className="text-xl font-semibold mb-4">{title}</h1>
            
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                {channelThumbnail && (
                  <img
                    src={channelThumbnail}
                    alt={channelTitle}
                    className="h-10 w-10 rounded-full"
                  />
                )}
                <div>
                  <h3 className="font-medium">{channelTitle}</h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {views} views • {uploadedAt}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-youtube-hover-bg hover:bg-gray-200 dark:hover:bg-opacity-70">
                  <BiLike className="w-5 h-5" />
                  <span>{likeCount}</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-youtube-hover-bg hover:bg-gray-200 dark:hover:bg-opacity-70">
                  <BiDislike className="w-5 h-5" />
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-youtube-hover-bg hover:bg-gray-200 dark:hover:bg-opacity-70">
                  <RiShareForwardLine className="w-5 h-5" />
                  <span>Share</span>
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-youtube-hover-bg">
                  <BsThreeDots className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="mt-4 bg-gray-100 dark:bg-youtube-hover-bg rounded-xl p-4">
              <p className="whitespace-pre-wrap">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;