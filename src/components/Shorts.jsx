import React, { useState, useEffect } from 'react';
import { BsPlay } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaCommentDots } from 'react-icons/fa';
import { RiShareForwardLine } from 'react-icons/ri';

const Shorts = () => {
  const [shorts, setShorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShorts = async () => {
      try {
        const response = await fetch(
          'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=shorts&type=video&videoDuration=short&key=AIzaSyCk7jaBPm1eq06u9bUNTmm-k6cW8BoTaRc'
        );
        const data = await response.json();
        const formattedShorts = data.items.map(item => ({
          id: item.id.videoId,
          thumbnail: item.snippet.thumbnails.high.url,
          title: item.snippet.title,
          views: Math.floor(Math.random() * 1000000) + 'K',
          likes: Math.floor(Math.random() * 100000) + 'K',
          comments: Math.floor(Math.random() * 10000) + 'K'
        }));
        setShorts(formattedShorts);
        setLoading(false);
      } catch (err) {
        setError('Failed to load shorts');
        setLoading(false);
      }
    };

    fetchShorts();
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
    {
      id: 1,
      thumbnail: 'https://picsum.photos/300/500',
      title: 'Amazing Trick Shot',
      views: '1.2M',
      likes: '50K',
      comments: '1.2K'
    },
    {
      id: 2,
      thumbnail: 'https://picsum.photos/300/501',
      title: 'Quick Recipe Tutorial',
      views: '800K',
      likes: '45K',
      comments: '956'
    },
    {
      id: 3,
      thumbnail: 'https://picsum.photos/300/502',
      title: 'Dance Challenge',
      views: '2.1M',
      likes: '150K',
      comments: '2.5K'
    },
    {
      id: 4,
      thumbnail: 'https://picsum.photos/300/503',
      title: 'Life Hack',
      views: '950K',
      likes: '65K',
      comments: '1.1K'
    }
  ];

  return (
    <div className="pt-14 pl-60 min-h-screen bg-youtube-light-bg dark:bg-youtube-dark-bg">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Shorts</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {shorts.map((short) => (
            <div key={short.id} className="relative group cursor-pointer">
              <div className="aspect-[9/16] rounded-xl overflow-hidden">
                <img 
                  src={short.thumbnail} 
                  alt={short.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-white font-medium mb-2">{short.title}</h3>
                <p className="text-gray-300 text-sm">{short.views} views</p>
              </div>
              <div className="absolute right-2 bottom-2 flex flex-col gap-3 bg-black bg-opacity-50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-white hover:text-youtube-red transition-colors">
                  <AiOutlineHeart className="w-6 h-6" />
                  <span className="text-xs">{short.likes}</span>
                </button>
                <button className="text-white hover:text-youtube-red transition-colors">
                  <FaCommentDots className="w-6 h-6" />
                  <span className="text-xs">{short.comments}</span>
                </button>
                <button className="text-white hover:text-youtube-red transition-colors">
                  <RiShareForwardLine className="w-6 h-6" />
                </button>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <BsPlay className="w-16 h-16 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shorts;