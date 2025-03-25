import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiTime } from 'react-icons/bi';

const History = () => {
  const historyItems = [
    {
      id: 1,
      thumbnail: 'https://picsum.photos/320/180',
      title: 'Building a YouTube Clone with React',
      channelName: 'Code Masters',
      views: '125K',
      watchedAt: '2 hours ago',
      duration: '15:24'
    },
    {
      id: 2,
      thumbnail: 'https://picsum.photos/320/181',
      title: 'Advanced JavaScript Concepts',
      channelName: 'JS Ninja',
      views: '89K',
      watchedAt: 'Yesterday',
      duration: '22:15'
    },
    {
      id: 3,
      thumbnail: 'https://picsum.photos/320/182',
      title: 'React Performance Optimization Tips',
      channelName: 'React Guru',
      views: '200K',
      watchedAt: '3 days ago',
      duration: '18:30'
    }
  ];

  return (
    <div className="pt-14 pl-60 min-h-screen bg-youtube-light-bg dark:bg-youtube-dark-bg">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Watch History</h1>
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-youtube-hover-bg rounded-full">
            <AiOutlineDelete className="w-5 h-5" />
            Clear History
          </button>
        </div>

        <div className="grid gap-4">
          {historyItems.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 hover:bg-gray-100 dark:hover:bg-youtube-hover-bg rounded-xl transition-colors cursor-pointer">
              <div className="relative w-48 aspect-video rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                  {item.duration}
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.channelName}</p>
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span>{item.views} views</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <BiTime className="w-4 h-4" />
                    <span>Watched {item.watchedAt}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-200 dark:hover:bg-youtube-hover-bg rounded-full self-start">
                <AiOutlineDelete className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;