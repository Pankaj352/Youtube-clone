import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import VideoCard from './components/VideoCard';
import { fetchTrendingVideos, searchVideos } from './utils/youtube';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTrendingVideos = async () => {
      try {
        const trendingVideos = await fetchTrendingVideos();
        setVideos(trendingVideos);
        setLoading(false);
      } catch (err) {
        setError('Failed to load videos');
        setLoading(false);
      }
    };

    loadTrendingVideos();
  }, []);

  const handleSearch = async (searchResults) => {
    setVideos(searchResults);
  };

  return (
    <div className="min-h-screen bg-youtube-light-bg dark:bg-youtube-dark-bg text-black dark:text-white">
      <Navbar onSearch={handleSearch} />
      <Sidebar />
      <main className="pt-14 pl-60">
        {loading ? (
          <div className="flex justify-center items-center h-[calc(100vh-56px)]">
            <div className="w-8 h-8 border-4 border-youtube-red border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-[calc(100vh-56px)]">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
