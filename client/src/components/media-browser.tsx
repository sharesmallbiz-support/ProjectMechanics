import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { YouTubeService } from "@/services/youtube";
import { UnsplashService } from "@/services/unsplash";
import { Search, Play, Download, Upload, Image, Youtube } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MediaBrowserProps {
  type: 'youtube' | 'unsplash' | 'upload';
  onSelect: (mediaUrl: string, mediaType: string) => void;
}

export function MediaBrowser({ type: initialType, onSelect }: MediaBrowserProps) {
  const [activeTab, setActiveTab] = useState(initialType);
  const [searchQuery, setSearchQuery] = useState("");
  const [youtubeVideos, setYoutubeVideos] = useState<any[]>([]);
  const [unsplashPhotos, setUnsplashPhotos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const searchYouTubeVideos = async (query: string) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await YouTubeService.searchVideos(query, 12);
      setYoutubeVideos(response.items || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search YouTube videos. Please check your API key.",
        variant: "destructive",
      });
      setYoutubeVideos([]);
    } finally {
      setIsLoading(false);
    }
  };

  const searchUnsplashPhotos = async (query: string) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await UnsplashService.searchPhotos(query, 1, 12);
      setUnsplashPhotos(response.results || []);
    } catch (error) {
      toast({
        title: "Error", 
        description: "Failed to search Unsplash photos. Please check your API key.",
        variant: "destructive",
      });
      setUnsplashPhotos([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (activeTab === 'youtube') {
      searchYouTubeVideos(searchQuery);
    } else if (activeTab === 'unsplash') {
      searchUnsplashPhotos(searchQuery);
    }
  };

  const handleSelectYouTubeVideo = (video: any) => {
    const videoId = video.id.videoId;
    onSelect(videoId, 'youtube');
  };

  const handleSelectUnsplashPhoto = (photo: any) => {
    // Trigger download tracking as required by Unsplash API
    UnsplashService.getTriggerDownload(photo);
    onSelect(photo.urls.regular, 'image');
  };

  // Auto-search for default content when tab changes
  useEffect(() => {
    if (activeTab === 'youtube' && youtubeVideos.length === 0) {
      setSearchQuery('project management');
      searchYouTubeVideos('project management');
    } else if (activeTab === 'unsplash' && unsplashPhotos.length === 0) {
      setSearchQuery('business team meeting');
      searchUnsplashPhotos('business team meeting');
    }
  }, [activeTab]);

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3" data-testid="tabs-media-browser">
          <TabsTrigger value="youtube" data-testid="tab-youtube">
            <Youtube className="mr-2 h-4 w-4" />
            YouTube
          </TabsTrigger>
          <TabsTrigger value="unsplash" data-testid="tab-unsplash">
            <Image className="mr-2 h-4 w-4" />
            Unsplash
          </TabsTrigger>
          <TabsTrigger value="upload" data-testid="tab-upload">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </TabsTrigger>
        </TabsList>

        {/* Search Bar */}
        {(activeTab === 'youtube' || activeTab === 'unsplash') && (
          <div className="flex gap-2 mt-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={`Search ${activeTab === 'youtube' ? 'videos' : 'photos'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10"
                data-testid="input-media-search"
              />
            </div>
            <Button onClick={handleSearch} disabled={isLoading} data-testid="button-media-search">
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </div>
        )}

        {/* YouTube Tab */}
        <TabsContent value="youtube" className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8" data-testid="text-youtube-loading">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Searching YouTube videos...</p>
            </div>
          ) : youtubeVideos.length === 0 ? (
            <Card className="p-8 text-center">
              <Youtube className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2" data-testid="text-no-youtube-results">No videos found</h3>
              <p className="text-muted-foreground" data-testid="text-no-youtube-results-description">
                Try searching for different keywords or check your YouTube API configuration.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {youtubeVideos.map((video) => (
                <Card key={video.id.videoId} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" data-testid={`card-youtube-video-${video.id.videoId}`}>
                  <div className="relative">
                    <img 
                      src={video.snippet.thumbnails.medium.url}
                      alt={video.snippet.title}
                      className="w-full h-32 object-cover"
                      data-testid={`img-youtube-thumbnail-${video.id.videoId}`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-sm mb-2 line-clamp-2" data-testid={`text-youtube-title-${video.id.videoId}`}>
                      {video.snippet.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-3" data-testid={`text-youtube-channel-${video.id.videoId}`}>
                      {video.snippet.channelTitle}
                    </p>
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleSelectYouTubeVideo(video)}
                      data-testid={`button-select-youtube-${video.id.videoId}`}
                    >
                      Select Video
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Unsplash Tab */}
        <TabsContent value="unsplash" className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8" data-testid="text-unsplash-loading">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Searching Unsplash photos...</p>
            </div>
          ) : unsplashPhotos.length === 0 ? (
            <Card className="p-8 text-center">
              <Image className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2" data-testid="text-no-unsplash-results">No photos found</h3>
              <p className="text-muted-foreground" data-testid="text-no-unsplash-results-description">
                Try searching for different keywords or check your Unsplash API configuration.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unsplashPhotos.map((photo) => (
                <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" data-testid={`card-unsplash-photo-${photo.id}`}>
                  <div className="relative">
                    <img 
                      src={photo.urls.small}
                      alt={photo.alt_description || photo.description || 'Unsplash photo'}
                      className="w-full h-32 object-cover"
                      data-testid={`img-unsplash-photo-${photo.id}`}
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-muted-foreground" data-testid={`text-unsplash-photographer-${photo.id}`}>
                        By {photo.user.name}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {photo.width} × {photo.height}
                      </Badge>
                    </div>
                    <p className="text-sm mb-3 line-clamp-2" data-testid={`text-unsplash-description-${photo.id}`}>
                      {photo.alt_description || photo.description || 'Professional photo'}
                    </p>
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleSelectUnsplashPhoto(photo)}
                      data-testid={`button-select-unsplash-${photo.id}`}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Select Photo
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Upload Tab */}
        <TabsContent value="upload" className="space-y-4">
          <Card className="p-8 text-center">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2" data-testid="text-upload-title">Upload Local Files</h3>
            <p className="text-muted-foreground mb-6" data-testid="text-upload-description">
              Select images or documents from your computer to upload.
            </p>
            <div className="max-w-md mx-auto">
              <input
                type="file"
                accept="image/*,video/*,.pdf,.doc,.docx"
                className="hidden"
                id="file-upload"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // In a real app, this would upload to a server and return a URL
                    const mockUrl = URL.createObjectURL(file);
                    onSelect(mockUrl, file.type.startsWith('image/') ? 'image' : 'file');
                  }
                }}
                data-testid="input-file-upload"
              />
              <label htmlFor="file-upload">
                <Button className="w-full" data-testid="button-choose-file">
                  <Upload className="mr-2 h-4 w-4" />
                  Choose File
                </Button>
              </label>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
