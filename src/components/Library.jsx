import React, { useState, useEffect } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BiLike } from 'react-icons/bi';
import { MdOutlineWatchLater } from 'react-icons/md';

const Library = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch(
          'https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&mine=true&maxResults=10&key=AIzaSyCk7jaBPm1eq06u9bUNTmm-k6cW8BoTaRc'
        );
        const data = await response.json();
        const formattedPlaylists = data.items.map(item => ({
          id: item.id,
          title: item.snippet.title,
          videoCount: item.contentDetails.itemCount,
          lastUpdated: new Date(item.snippet.publishedAt).toLocaleDateString(),
          icon: item.snippet.title.includes('Watch Later') ? 
            <MdOutlineWatchLater className="w-6 h-6" /> :
            item.snippet.title.includes('Liked') ?
            <BiLike className="w-6 h-6" /> :
            <AiOutlineClockCircle className="w-6 h-6" />
        }));
        setPlaylists(formattedPlaylists);
        setLoading(false);
      } catch (err) {
        setError('Failed to load playlists');
        setLoading(false);
      }
    };

    fetchPlaylists();
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
      title: 'Watch Later',
      icon: <MdOutlineWatchLater className="w-6 h-6" />,
      videoCount: 15,
      lastUpdated: '2 days ago'
    },
    {
      id: 2,
      title: 'Liked Videos',
      icon: <BiLike className="w-6 h-6" />,
      videoCount: 45,
      lastUpdated: '1 week ago'
    },
    {
      id: 3,
      title: 'History',
      icon: <AiOutlineClockCircle className="w-6 h-6" />,
      videoCount: 100,
      lastUpdated: 'Updated today'
    }
  ];

  return (
    <div className="pt-14 pl-60 min-h-screen bg-youtube-light-bg dark:bg-youtube-dark-bg">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Library</h1>
        <div className="grid gap-4">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-youtube-hover-bg transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-gray-200 dark:bg-youtube-hover-bg rounded-xl flex items-center justify-center">
                {playlist.icon}
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-medium">{playlist.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {playlist.videoCount} videos • {playlist.lastUpdated}
                </p>
              </div>
              <button className="p-2 hover:bg-gray-200 dark:hover:bg-youtube-hover-bg rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m7-7H5" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;