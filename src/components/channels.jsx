import React, { useState, useEffect } from 'react';
import { BsCode, BsController, BsMusicNote, BsPhone, BsPalette } from 'react-icons/bs';

const Channels = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch(
          'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=channel&q=tech,gaming,music,art&key=AIzaSyCk7jaBPm1eq06u9bUNTmm-k6cW8BoTaRc'
        );
        const data = await response.json();
        const channelIds = data.items.map(item => item.snippet.channelId).join(',');

        const channelResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelIds}&key=AIzaSyCk7jaBPm1eq06u9bUNTmm-k6cW8BoTaRc`
        );
        const channelData = await channelResponse.json();

        const formattedChannels = channelData.items.map(channel => ({
          id: channel.id,
          name: channel.snippet.title,
          icon: channel.snippet.title.toLowerCase().includes('code') ? 
            <BsCode className="w-6 h-6" /> :
            channel.snippet.title.toLowerCase().includes('game') ?
            <BsController className="w-6 h-6" /> :
            channel.snippet.title.toLowerCase().includes('music') ?
            <BsMusicNote className="w-6 h-6" /> :
            channel.snippet.title.toLowerCase().includes('tech') ?
            <BsPhone className="w-6 h-6" /> :
            <BsPalette className="w-6 h-6" />,
          subscribers: parseInt(channel.statistics.subscriberCount).toLocaleString(),
          videos: parseInt(channel.statistics.videoCount)
        }));
        setChannels(formattedChannels);
        setLoading(false);
      } catch (err) {
        setError('Failed to load channels');
        setLoading(false);
      }
    };

    fetchChannels();
  }, []);

  if (loading) {
    return (
      <div className="pt-14 pl-60 min-h-screen bg-youtube-light-bg dark:bg-youtube-dark-bg flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-youtube-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-14 pl-60 min-h-screen bg-youtube-light-bg dark:bg-youtube-dark-bg flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const
    { icon: <BsCode className="w-6 h-6" />, name: 'Coding Channel', subscribers: '1.2M', videos: 245 },
    { icon: <BsController className="w-6 h-6" />, name: 'Gaming Pro', subscribers: '850K', videos: 189 },
    { icon: <BsMusicNote className="w-6 h-6" />, name: 'Music Vibes', subscribers: '2.1M', videos: 312 },
    { icon: <BsPhone className="w-6 h-6" />, name: 'Tech Reviews', subscribers: '925K', videos: 178 },
    { icon: <BsPalette className="w-6 h-6" />, name: 'Art & Design', subscribers: '1.5M', videos: 256 }
  ];

  return (
    <div className="pt-14 pl-60 min-h-screen bg-youtube-light-bg dark:bg-youtube-dark-bg">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Channels</h1>
        <div className="grid gap-4">
          {channels.map((channel, index) => (
            <div key={index} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-youtube-hover-bg transition-colors cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-youtube-hover-bg flex items-center justify-center">
                {channel.icon}
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-medium">{channel.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {channel.subscribers} subscribers • {channel.videos} videos
                </p>
              </div>
              <button className="px-4 py-2 bg-youtube-red text-white rounded-full hover:bg-red-700 transition-colors">
                Subscribe
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Channels;