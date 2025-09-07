import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBlogPosts } from "@/hooks/use-blog-posts";
import { Plus } from "lucide-react";

export function BlogEngine() {
  const { data: posts = [], isLoading } = useBlogPosts(true);

  if (isLoading) {
    return <div className="flex justify-center p-8" data-testid="text-loading">Loading blog posts...</div>;
  }

  return (
    <section id="blog" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-between items-center mb-8">
            <div className="text-left">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" data-testid="text-blog-title">
                Blog Engine & Content Management
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl" data-testid="text-blog-description">
                Rich content creation tools with integrated media management for sharing project management insights and best practices.
              </p>
            </div>
            <Button className="flex items-center gap-2" data-testid="button-create-post">
              <Plus className="h-4 w-4" />
              Create Post
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post) => (
            <Card key={post.id} className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow" data-testid={`card-blog-post-${post.id}`}>
              <div className="relative">
                <img 
                  src={post.featuredImage || "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"} 
                  alt={post.title} 
                  className="w-full h-48 object-cover" 
                  data-testid={`img-blog-post-${post.id}`}
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Badge className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium" data-testid={`badge-blog-category-${post.id}`}>
                    {post.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground" data-testid={`text-blog-date-${post.id}`}>
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2" data-testid={`text-blog-title-${post.id}`}>
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4" data-testid={`text-blog-excerpt-${post.id}`}>
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40" 
                      alt="Author profile photo" 
                      className="w-8 h-8 rounded-full mr-2" 
                      data-testid={`img-blog-author-${post.id}`}
                    />
                    <span className="text-sm text-muted-foreground" data-testid={`text-blog-author-${post.id}`}>
                      {post.authorId}
                    </span>
                  </div>
                  <Button variant="ghost" className="text-primary hover:text-primary/80 text-sm font-medium" data-testid={`button-read-more-${post.id}`}>
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Rich Text Editor Demo */}
        <Card className="bg-card rounded-xl p-8 border border-border">
          <CardContent className="p-0">
            <h3 className="text-2xl font-bold mb-6" data-testid="text-editor-title">Rich Content Editor</h3>
            <div className="border border-border rounded-lg overflow-hidden">
              {/* Editor Toolbar */}
              <div className="bg-muted/50 p-4 border-b border-border">
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost" className="p-2 hover:bg-muted rounded" data-testid="button-format-bold">
                    <strong>B</strong>
                  </Button>
                  <Button size="sm" variant="ghost" className="p-2 hover:bg-muted rounded" data-testid="button-format-italic">
                    <em>I</em>
                  </Button>
                  <Button size="sm" variant="ghost" className="p-2 hover:bg-muted rounded" data-testid="button-format-underline">
                    <u>U</u>
                  </Button>
                  <div className="w-px h-6 bg-border mx-2"></div>
                  <Button size="sm" variant="ghost" className="p-2 hover:bg-muted rounded text-red-600" data-testid="button-add-youtube">
                    📹
                  </Button>
                  <Button size="sm" variant="ghost" className="p-2 hover:bg-muted rounded text-blue-600" data-testid="button-add-image">
                    🖼️
                  </Button>
                  <Button size="sm" variant="ghost" className="p-2 hover:bg-muted rounded" data-testid="button-upload-file">
                    📁
                  </Button>
                </div>
              </div>
              {/* Editor Content Area */}
              <div className="p-6 min-h-64 bg-background" data-testid="editor-content">
                <h4 className="text-lg font-semibold mb-3">Start writing your project management insights...</h4>
                <p className="text-muted-foreground">
                  Use the toolbar above to format your content, embed videos, add images, and create engaging posts that share your project management expertise with the community.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
