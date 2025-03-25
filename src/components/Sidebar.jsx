import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiFillHome, AiOutlineHistory } from 'react-icons/ai';
import { MdOutlineSubscriptions, MdOutlineVideoLibrary, MdOutlineExplore, MdOutlineSettings, MdOutlineFeedback } from 'react-icons/md';
import { BiLike, BiMovie, BiShoppingBag } from 'react-icons/bi';
import { SiYoutubeshorts, SiYoutubegaming } from 'react-icons/si';
import { BsMusicNote, BsNewspaper } from 'react-icons/bs';
import { IoTrophyOutline } from 'react-icons/io5';
import { RiVideoLine } from 'react-icons/ri';
import { BsCode, BsController, BsPhone, BsPalette, BsYoutube } from 'react-icons/bs';
import { SiYoutubemusic } from 'react-icons/si';
import { TfiYoutube } from 'react-icons/tfi';
import { MdChildCare } from 'react-icons/md';

const Sidebar = () => {
  const location = useLocation();

  const mainLinks = [
    { icon: <AiFillHome className="w-6 h-6" />, text: 'Home' },
    { icon: <SiYoutubeshorts className="w-6 h-6" />, text: 'Shorts' },
    { icon: <MdOutlineSubscriptions className="w-6 h-6" />, text: 'Subscriptions' },
  ];

  const secondaryLinks = [
    { icon: <MdOutlineVideoLibrary className="w-6 h-6" />, text: 'Library' },
    { icon: <AiOutlineHistory className="w-6 h-6" />, text: 'History' },
    { icon: <RiVideoLine className="w-6 h-6" />, text: 'Your Videos' },
    { icon: <BiLike className="w-6 h-6" />, text: 'Liked Videos' },
  ];

  const subscriptions = [
    { icon: <BsCode className="w-6 h-6" />, text: 'Coding Channel' },
    { icon: <BsController className="w-6 h-6" />, text: 'Gaming Pro' },
    { icon: <BsMusicNote className="w-6 h-6" />, text: 'Music Vibes' },
    { icon: <BsPhone className="w-6 h-6" />, text: 'Tech Reviews' },
    { icon: <BsPalette className="w-6 h-6" />, text: 'Art & Design' },
  ];

  const exploreLinks = [
    { icon: <IoTrophyOutline className="w-6 h-6" />, text: 'Trending' },
    { icon: <BiShoppingBag className="w-6 h-6" />, text: 'Shopping' },
    { icon: <BsMusicNote className="w-6 h-6" />, text: 'Music' },
    { icon: <BiMovie className="w-6 h-6" />, text: 'Films' },
    { icon: <SiYoutubegaming className="w-6 h-6" />, text: 'Gaming' },
    { icon: <BsNewspaper className="w-6 h-6" />, text: 'News' },
  ];

  const moreFromYoutube = [
    { icon: <BsYoutube className="w-6 h-6" />, text: 'YouTube Premium' },
    { icon: <TfiYoutube className="w-6 h-6" />, text: 'YouTube Studio' },
    { icon: <SiYoutubemusic className="w-6 h-6" />, text: 'YouTube Music' },
    { icon: <MdChildCare className="w-6 h-6" />, text: 'YouTube Kids' },
  ];

  const helpLinks = [
    { icon: <MdOutlineSettings className="w-6 h-6" />, text: 'Settings' },
    { icon: <MdOutlineFeedback className="w-6 h-6" />, text: 'Send Feedback' },
  ];

  return (
    <div className="w-60 bg-youtube-light-bg dark:bg-youtube-dark-bg h-[calc(100vh-56px)] fixed top-14 left-0 overflow-y-auto">
      <div className="px-2 py-4">
        <div className="mb-4">
          {mainLinks.map((link, index) => (
            <Link
              key={index}
              to={link.text.toLowerCase()}
              className={`flex items-center gap-6 px-6 py-3 hover:bg-gray-100 dark:hover:bg-youtube-hover-bg rounded-xl transition-colors ${location.pathname === '/' + link.text.toLowerCase() ? 'bg-gray-100 dark:bg-youtube-hover-bg' : ''}`}>
              {link.icon}
              <span className="text-sm tracking-wide">{link.text}</span>
            </Link>
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
          {secondaryLinks.map((link, index) => (
            <Link
              key={index}
              to={link.text.toLowerCase()}
              className={`flex items-center gap-6 px-6 py-3 hover:bg-gray-100 dark:hover:bg-youtube-hover-bg rounded-xl transition-colors ${location.pathname === '/' + link.text.toLowerCase() ? 'bg-gray-100 dark:bg-youtube-hover-bg' : ''}`}>
              {link.icon}
              <span className="text-sm tracking-wide">{link.text}</span>
            </Link>
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
          <h3 className="px-6 py-2 text-base font-medium">Subscriptions</h3>
          {subscriptions.map((link, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center gap-6 px-6 py-3 hover:bg-gray-100 dark:hover:bg-youtube-hover-bg rounded-xl transition-colors">
              <span className="w-6 h-6 text-xl flex items-center justify-center">{link.icon}</span>
              <span className="text-sm tracking-wide">{link.text}</span>
            </a>
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
          <h3 className="px-6 py-2 text-base font-medium">Explore</h3>
          {exploreLinks.map((link, index) => (
            <Link
              key={index}
              to={link.text.toLowerCase()}
              className={`flex items-center gap-6 px-6 py-3 hover:bg-gray-100 dark:hover:bg-youtube-hover-bg rounded-xl transition-colors ${location.pathname === '/' + link.text.toLowerCase() ? 'bg-gray-100 dark:bg-youtube-hover-bg' : ''}`}>
              {link.icon}
              <span className="text-sm tracking-wide">{link.text}</span>
            </Link>
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
          <h3 className="px-6 py-2 text-base font-medium">More from YouTube</h3>
          {moreFromYoutube.map((link, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center gap-6 px-6 py-3 hover:bg-gray-100 dark:hover:bg-youtube-hover-bg rounded-xl transition-colors">
              <span className="w-6 h-6 text-xl flex items-center justify-center">{link.icon}</span>
              <span className="text-sm tracking-wide">{link.text}</span>
            </a>
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          {helpLinks.map((link, index) => (
            <Link
              key={index}
              to={link.text.toLowerCase()}
              className={`flex items-center gap-6 px-6 py-3 hover:bg-gray-100 dark:hover:bg-youtube-hover-bg rounded-xl transition-colors ${location.pathname === '/' + link.text.toLowerCase() ? 'bg-gray-100 dark:bg-youtube-hover-bg' : ''}`}>
              {link.icon}
              <span className="text-sm tracking-wide">{link.text}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;