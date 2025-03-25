const API_KEY = 'AIzaSyCk7jaBPm1eq06u9bUNTmm-k6cW8BoTaRc';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const fetchTrendingVideos = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/videos?part=snippet,statistics&chart=mostPopular&maxResults=20&regionCode=US&key=${API_KEY}`
    );
    const data = await response.json();
    const formattedVideos = data.items.map(formatVideoData);
    return await fetchChannelThumbnails(formattedVideos);
  } catch (error) {
    console.error('Error fetching trending videos:', error);
    throw error;
  }
};

export const searchVideos = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search?part=snippet&maxResults=20&q=${query}&type=video&key=${API_KEY}`
    );
    const data = await response.json();
    const videoIds = data.items.map(item => item.id.videoId).join(',');
    
    // Get additional video details
    const videoDetailsResponse = await fetch(
      `${BASE_URL}/videos?part=snippet,statistics&id=${videoIds}&key=${API_KEY}`
    );
    const videoDetails = await videoDetailsResponse.json();
    const formattedVideos = videoDetails.items.map(formatVideoData);
    return await fetchChannelThumbnails(formattedVideos);
  } catch (error) {
    console.error('Error searching videos:', error);
    throw error;
  }
};

const formatVideoData = (video) => {
  const { id, snippet, statistics } = video;
  return {
    id: typeof id === 'string' ? id : id.videoId,
    title: snippet.title,
    channelName: snippet.channelTitle,
    channelId: snippet.channelId,
    thumbnail: snippet.thumbnails.high?.url || snippet.thumbnails.medium.url,
    uploadedAt: formatUploadTime(snippet.publishedAt),
    views: formatViewCount(statistics?.viewCount),
    likeCount: formatViewCount(statistics?.likeCount),
    description: snippet.description
  };
};

const formatViewCount = (count) => {
  if (!count) return '0';
  count = parseInt(count);
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

const formatUploadTime = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];

  for (let interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count === 1 ? '' : 's'} ago`;
    }
  }
  return 'just now';
}

const fetchChannelThumbnails = async (videos) => {
  try {
    const channelIds = [...new Set(videos.map(video => video.channelId))];
    const response = await fetch(
      `${BASE_URL}/channels?part=snippet&id=${channelIds.join(',')}&key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data.items || !Array.isArray(data.items)) {
      throw new Error('Invalid response format from YouTube API');
    }
    const channelThumbnails = {};
    data.items.forEach(channel => {
      channelThumbnails[channel.id] = channel.snippet.thumbnails.default.url;
    });
    return videos.map(video => ({
      ...video,
      channelThumbnail: channelThumbnails[video.channelId] || null
    }));
  } catch (error) {
    console.error('Error fetching channel thumbnails:', error);
    return videos.map(video => ({ ...video, channelThumbnail: null }));
  }
};
