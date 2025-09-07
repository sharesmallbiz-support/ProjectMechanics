interface YouTubeVideo {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
    channelTitle: string;
    publishedAt: string;
  };
}

interface YouTubeSearchResponse {
  items: YouTubeVideo[];
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export class YouTubeService {
  static async searchVideos(query: string, maxResults = 10): Promise<YouTubeSearchResponse> {
    const response = await fetch(`/api/youtube/search?q=${encodeURIComponent(query)}&maxResults=${maxResults}`);
    
    if (!response.ok) {
      throw new Error(`Failed to search YouTube videos: ${response.status}`);
    }
    
    return await response.json();
  }

  static getEmbedUrl(videoId: string): string {
    return `https://www.youtube.com/embed/${videoId}`;
  }

  static getThumbnailUrl(videoId: string, quality: 'default' | 'medium' | 'high' = 'medium'): string {
    return `https://img.youtube.com/vi/${videoId}/${quality === 'default' ? 'default' : quality === 'medium' ? 'mqdefault' : 'hqdefault'}.jpg`;
  }
}
