interface UnsplashPhoto {
  id: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  user: {
    id: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string | null;
    twitter_username: string | null;
    portfolio_url: string | null;
    bio: string | null;
    location: string | null;
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
      following: string;
      followers: string;
    };
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
  };
}

interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
}

export class UnsplashService {
  static async searchPhotos(query: string, page = 1, perPage = 10): Promise<UnsplashSearchResponse> {
    const response = await fetch(`/api/unsplash/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`);
    
    if (!response.ok) {
      throw new Error(`Failed to search Unsplash photos: ${response.status}`);
    }
    
    return await response.json();
  }

  static getDownloadUrl(photo: UnsplashPhoto): string {
    return photo.links.download_location;
  }

  static getTriggerDownload(photo: UnsplashPhoto): void {
    // Trigger download tracking as required by Unsplash API guidelines
    fetch(photo.links.download_location);
  }
}
