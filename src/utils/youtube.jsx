const API_KEY = 'AIzaSyCk7jaBPm1eq06u9bUNTmm-k6cW8BoTaRc';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const fetchTrendingVideos = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=20&regionCode=US&key=${API_KEY}`
    );
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('API key is invalid or has insufficient permissions');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data.items || !Array.isArray(data.items)) {
      throw new Error('Invalid response format from YouTube API');
    }
    const videosWithChannelInfo = await fetchChannelThumbnails(data.items);
    return videosWithChannelInfo.map(video => ({
      id: video.id,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium.url,
      channelName: video.snippet.channelTitle,
      channelThumbnail: video.channelThumbnail,
      views: formatViews(video.statistics.viewCount),
      uploadedAt: formatDate(video.snippet.publishedAt),
      duration: formatDuration(video.contentDetails.duration)
    }));
  } catch (error) {
    console.error('Error fetching trending videos:', error);
    throw error;
  }
};

export const searchVideos = async (query) => {
  try {
    const searchResponse = await fetch(
      `${BASE_URL}/search?part=snippet&maxResults=20&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}`
    );
    if (!searchResponse.ok) {
      throw new Error(`HTTP error! status: ${searchResponse.status}`);
    }
    const searchData = await searchResponse.json();
    
    if (!searchData.items || !Array.isArray(searchData.items)) {
      throw new Error('Invalid response format from YouTube API');
    }

    const videoIds = searchData.items.map(item => item.id.videoId).join(',');
    const videoDetailsResponse = await fetch(
      `${BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${API_KEY}`
    );
    
    if (!videoDetailsResponse.ok) {
      throw new Error(`HTTP error! status: ${videoDetailsResponse.status}`);
    }
    
    const videoDetailsData = await videoDetailsResponse.json();
    const videosWithChannelInfo = await fetchChannelThumbnails(videoDetailsData.items);
    
    return videosWithChannelInfo.map(video => ({
      id: video.id,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium.url,
      channelName: video.snippet.channelTitle,
      channelThumbnail: video.channelThumbnail,
      views: formatViews(video.statistics.viewCount),
      uploadedAt: formatDate(video.snippet.publishedAt),
      duration: formatDuration(video.contentDetails.duration)
    }));
  } catch (error) {
    console.error('Error searching videos:', error);
    return [];
  }
};

const formatViews = (viewCount) => {
  if (viewCount >= 1000000) {
    return `${(viewCount / 1000000).toFixed(1)}M`;
  } else if (viewCount >= 1000) {
    return `${(viewCount / 1000).toFixed(1)}K`;
  }
  return viewCount;
};

const formatDate = (publishedAt) => {
  const diff = new Date() - new Date(publishedAt);
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) return `${years} year${years === 1 ? '' : 's'} ago`;
  if (months > 0) return `${months} month${months === 1 ? '' : 's'} ago`;
  if (days > 0) return `${days} day${days === 1 ? '' : 's'} ago`;
  if (hours > 0) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  if (minutes > 0) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
};

const formatDuration = (duration) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};