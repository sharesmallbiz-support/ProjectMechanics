import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Bold, Italic, Underline, Youtube, Image, Upload } from "lucide-react";
import { MediaBrowser } from "@/components/media-browser";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const [isMediaBrowserOpen, setIsMediaBrowserOpen] = useState(false);
  const [mediaType, setMediaType] = useState<'youtube' | 'unsplash' | 'upload'>('youtube');

  const formatText = (command: string) => {
    document.execCommand(command, false, '');
  };

  const insertMedia = (mediaUrl: string, mediaType: string) => {
    const selection = window.getSelection();
    if (selection?.rangeCount) {
      const range = selection.getRangeAt(0);
      let element;
      
      if (mediaType === 'youtube') {
        element = document.createElement('iframe');
        element.src = `https://www.youtube.com/embed/${getVideoId(mediaUrl)}`;
        element.width = '560';
        element.height = '315';
        element.allowFullscreen = true;
      } else {
        element = document.createElement('img');
        element.src = mediaUrl;
        element.style.maxWidth = '100%';
        element.style.height = 'auto';
      }
      
      range.insertNode(element);
      selection.removeAllRanges();
    }
  };

  const getVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : url;
  };

  const handleMediaSelect = (mediaUrl: string, type: string) => {
    insertMedia(mediaUrl, type);
    setIsMediaBrowserOpen(false);
  };

  return (
    <Card className="bg-card rounded-xl border border-border">
      <CardContent className="p-0">
        {/* Editor Toolbar */}
        <div className="bg-muted/50 p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => formatText('bold')}
              data-testid="button-editor-bold"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => formatText('italic')}
              data-testid="button-editor-italic"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => formatText('underline')}
              data-testid="button-editor-underline"
            >
              <Underline className="h-4 w-4" />
            </Button>
            <div className="w-px h-6 bg-border mx-2"></div>
            
            <Dialog open={isMediaBrowserOpen} onOpenChange={setIsMediaBrowserOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => {setMediaType('youtube'); setIsMediaBrowserOpen(true);}}
                  data-testid="button-editor-youtube"
                >
                  <Youtube className="h-4 w-4 text-red-600" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Media Browser</DialogTitle>
                </DialogHeader>
                <MediaBrowser 
                  type={mediaType} 
                  onSelect={handleMediaSelect}
                />
              </DialogContent>
            </Dialog>

            <Dialog open={isMediaBrowserOpen} onOpenChange={setIsMediaBrowserOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => {setMediaType('unsplash'); setIsMediaBrowserOpen(true);}}
                  data-testid="button-editor-image"
                >
                  <Image className="h-4 w-4 text-blue-600" />
                </Button>
              </DialogTrigger>
            </Dialog>

            <Button 
              size="sm" 
              variant="ghost"
              data-testid="button-editor-upload"
            >
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Editor Content Area */}
        <div 
          className="p-6 min-h-64 bg-background focus:outline-none"
          contentEditable
          dangerouslySetInnerHTML={{ __html: content }}
          onBlur={(e) => onChange(e.currentTarget.innerHTML)}
          data-testid="editor-content-area"
        />
      </CardContent>
    </Card>
  );
}
