import { useParams, Link } from "wouter";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useBlogPostBySlug, useComments, useCreateComment } from "@/hooks/use-blog-posts";
import { Calendar, User, ArrowLeft, MessageCircle, Heart, Share } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function BlogPost() {
  const { slug } = useParams();
  const { data: post, isLoading: postLoading } = useBlogPostBySlug(slug || '');
  const { data: comments = [], isLoading: commentsLoading } = useComments(post?.id || '');
  const createComment = useCreateComment();
  const [newComment, setNewComment] = useState('');
  const { toast } = useToast();

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !post) return;

    try {
      await createComment.mutateAsync({
        content: newComment,
        postId: post.id,
        authorId: 'current-user', // In a real app, this would come from auth context
        parentId: null,
      });
      setNewComment('');
      toast({
        title: "Comment posted",
        description: "Your comment has been added successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (postLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="flex justify-center items-center min-h-[60vh]" data-testid="text-post-loading">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground">Loading blog post...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="flex justify-center items-center min-h-[60vh]" data-testid="text-post-not-found">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-lg text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
            <Link href="/blog">
              <Button data-testid="button-back-to-blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog">
            <Button variant="ghost" className="mb-8" data-testid="button-back-to-blog-list">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Badge className="bg-primary/10 text-primary" data-testid="badge-post-category">
                {post.category}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                <span data-testid="text-post-published-date">
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long', 
                    day: 'numeric'
                  }) : 'Draft'}
                </span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="mr-2 h-4 w-4" />
                <span data-testid="text-post-author">{post.authorId}</span>
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight" data-testid="text-post-title">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed" data-testid="text-post-excerpt">
                {post.excerpt}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featuredImage && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <img 
              src={post.featuredImage} 
              alt={post.title}
              className="w-full h-96 object-cover rounded-xl shadow-lg"
              data-testid="img-post-featured"
            />
          </div>
        </section>
      )}

      {/* Article Content */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none" data-testid="content-post-body">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <h4 className="text-sm font-semibold text-muted-foreground mb-3">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" data-testid={`badge-post-tag-${index}`}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" data-testid="button-post-like">
                  <Heart className="mr-2 h-4 w-4" />
                  Like
                </Button>
                <Button variant="outline" size="sm" data-testid="button-post-share">
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MessageCircle className="mr-2 h-4 w-4" />
                <span data-testid="text-post-comment-count">{comments.length} comments</span>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold mb-8" data-testid="text-comments-title">
            Comments ({comments.length})
          </h3>
          
          {/* Add Comment */}
          <Card className="bg-card border border-border mb-8">
            <CardContent className="p-6">
              <h4 className="font-semibold mb-4" data-testid="text-add-comment-title">Add a comment</h4>
              <div className="space-y-4">
                <Textarea
                  placeholder="Share your thoughts..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[120px]"
                  data-testid="textarea-new-comment"
                />
                <div className="flex justify-end">
                  <Button 
                    onClick={handleSubmitComment}
                    disabled={!newComment.trim() || createComment.isPending}
                    data-testid="button-submit-comment"
                  >
                    {createComment.isPending ? 'Posting...' : 'Post Comment'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Comments List */}
          <div className="space-y-6">
            {commentsLoading ? (
              <div className="text-center py-8" data-testid="text-comments-loading">
                <p className="text-muted-foreground">Loading comments...</p>
              </div>
            ) : comments.length === 0 ? (
              <Card className="bg-card border border-border">
                <CardContent className="p-8 text-center">
                  <MessageCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h4 className="text-lg font-semibold mb-2" data-testid="text-no-comments">No comments yet</h4>
                  <p className="text-muted-foreground" data-testid="text-no-comments-description">
                    Be the first to share your thoughts on this post.
                  </p>
                </CardContent>
              </Card>
            ) : (
              comments.map((comment) => (
                <Card key={comment.id} className="bg-card border border-border" data-testid={`card-comment-${comment.id}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40" 
                        alt="Commenter profile" 
                        className="w-10 h-10 rounded-full" 
                        data-testid={`img-comment-author-${comment.id}`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-semibold" data-testid={`text-comment-author-${comment.id}`}>
                            {comment.authorId}
                          </span>
                          <span className="text-sm text-muted-foreground" data-testid={`text-comment-date-${comment.id}`}>
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-muted-foreground" data-testid={`text-comment-content-${comment.id}`}>
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
