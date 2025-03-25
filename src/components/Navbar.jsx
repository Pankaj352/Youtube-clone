import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { IoSearchOutline } from 'react-icons/io5';
import { BsYoutube } from 'react-icons/bs';
import { HiOutlineMicrophone } from 'react-icons/hi';
import { RiVideoAddLine } from 'react-icons/ri';
import { IoNotificationsOutline } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { searchVideos } from '../utils/youtube';

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      setSearchError(null);
      try {
        const results = await searchVideos(searchQuery);
        onSearch(results);
      } catch (error) {
        setSearchError('Failed to search videos');
        console.error('Search error:', error);
      } finally {
        setIsSearching(false);
      }
    }
  };

  return (
    <nav className="flex justify-between items-center px-4 h-14 bg-youtube-light-bg dark:bg-youtube-dark-bg fixed w-full top-0 z-50">
      <div className="flex items-center gap-4">
        <button className="hover:bg-gray-100 p-2 rounded-full">
          <FiMenu className="w-6 h-6" />
        </button>
        <a href="/" className="flex items-center gap-1">
          <BsYoutube className="w-8 h-8 text-youtube-red" />
          <span className="text-xl font-bold">YouTube</span>
        </a>
      </div>

      <div className="flex items-center gap-4 flex-grow justify-center max-w-2xl">
        <div className="flex items-center flex-grow max-w-[600px]">
          <form onSubmit={handleSearch} className="flex items-center flex-grow">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-l-full focus:outline-none dark:bg-youtube-black"
                disabled={isSearching}
              />
              {searchError && (
                <div className="absolute -bottom-6 left-0 text-red-500 text-sm">
                  {searchError}
                </div>
              )}
            </div>
            <button 
              type="submit" 
              className="px-6 py-2 border border-l-0 border-gray-300 dark:border-gray-700 rounded-r-full hover:bg-gray-100 dark:hover:bg-youtube-hover-bg dark:bg-youtube-black"
              disabled={isSearching}
            >
              {isSearching ? (
                <div className="w-6 h-6 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <IoSearchOutline className="w-6 h-6" />
              )}
            </button>
          </form>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full ml-4">
          <HiOutlineMicrophone className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <RiVideoAddLine className="w-6 h-6" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <IoNotificationsOutline className="w-6 h-6" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <CgProfile className="w-8 h-8" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;