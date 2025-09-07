import { useState } from "react";
import { Link } from "wouter";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RichTextEditor } from "@/components/rich-text-editor";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBlogPosts } from "@/hooks/use-blog-posts";
import { Plus, Search, Edit, Calendar, User, Eye } from "lucide-react";

export default function Blog() {
  const { data: allPosts = [], isLoading } = useBlogPosts();
  const { data: publishedPosts = [], isLoading: publishedLoading } = useBlogPosts(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editorContent, setEditorContent] = useState("");

  // Get unique categories from posts
  const categories = Array.from(new Set(allPosts.map(post => post.category)));

  const filterPosts = (posts: typeof allPosts) => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  };

  const filteredPublishedPosts = filterPosts(publishedPosts);
  const filteredAllPosts = filterPosts(allPosts);

  if (isLoading || publishedLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="flex justify-center items-center min-h-[60vh]" data-testid="text-blog-loading">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground">Loading blog posts...</p>
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
      <section className="gradient-bg text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6" data-testid="text-blog-hero-title">
              Project Management <span className="text-yellow-300">Blog</span>
            </h1>
            <p className="text-lg lg:text-xl opacity-90 mb-8 leading-relaxed max-w-4xl mx-auto" data-testid="text-blog-hero-description">
              Rich content creation tools with integrated media management for sharing project management insights and best practices.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="published" className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <TabsList className="grid w-full sm:w-auto grid-cols-2" data-testid="tabs-blog-navigation">
                <TabsTrigger value="published" data-testid="tab-published-posts">Published Posts</TabsTrigger>
                <TabsTrigger value="all" data-testid="tab-all-posts">All Posts</TabsTrigger>
              </TabsList>
              
              <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2" data-testid="button-blog-create-post">
                    <Plus className="h-4 w-4" />
                    Create Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle data-testid="text-create-post-title">Create New Blog Post</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Title</label>
                        <Input placeholder="Enter post title..." data-testid="input-post-title" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Category</label>
                        <Select>
                          <SelectTrigger data-testid="select-post-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Project Management">Project Management</SelectItem>
                            <SelectItem value="Best Practices">Best Practices</SelectItem>
                            <SelectItem value="Tools">Tools</SelectItem>
                            <SelectItem value="Case Studies">Case Studies</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Excerpt</label>
                      <Input placeholder="Brief description of the post..." data-testid="input-post-excerpt" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Content</label>
                      <RichTextEditor 
                        content={editorContent} 
                        onChange={setEditorContent}
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => setIsCreateModalOpen(false)} data-testid="button-cancel-post">
                        Cancel
                      </Button>
                      <Button variant="outline" data-testid="button-save-draft">
                        Save Draft
                      </Button>
                      <Button data-testid="button-publish-post">
                        Publish
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-posts"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[200px]" data-testid="select-category-filter">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Published Posts Tab */}
            <TabsContent value="published" className="space-y-8">
              {filteredPublishedPosts.length === 0 ? (
                <Card className="bg-card border border-border p-12">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2" data-testid="text-no-published-posts">No published posts found</h3>
                    <p className="text-muted-foreground" data-testid="text-no-published-posts-description">
                      {searchTerm || categoryFilter !== 'all' 
                        ? 'Try adjusting your search or filter criteria.'
                        : 'Start creating content to share your project management insights.'
                      }
                    </p>
                  </div>
                </Card>
              ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                  {filteredPublishedPosts.map((post) => (
                    <Card key={post.id} className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow" data-testid={`card-published-post-${post.id}`}>
                      <div className="relative">
                        <img 
                          src={post.featuredImage || "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"} 
                          alt={post.title} 
                          className="w-full h-48 object-cover" 
                          data-testid={`img-published-post-${post.id}`}
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2 mb-3">
                          <Badge className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium" data-testid={`badge-published-category-${post.id}`}>
                            {post.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground" data-testid={`text-published-date-${post.id}`}>
                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2" data-testid={`text-published-title-${post.id}`}>
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground mb-4" data-testid={`text-published-excerpt-${post.id}`}>
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img 
                              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40" 
                              alt="Author profile photo" 
                              className="w-8 h-8 rounded-full mr-2" 
                              data-testid={`img-published-author-${post.id}`}
                            />
                            <span className="text-sm text-muted-foreground" data-testid={`text-published-author-${post.id}`}>
                              {post.authorId}
                            </span>
                          </div>
                          <Link href={`/blog/${post.slug}`}>
                            <Button variant="ghost" className="text-primary hover:text-primary/80 text-sm font-medium" data-testid={`button-read-published-${post.id}`}>
                              Read More
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* All Posts Tab */}
            <TabsContent value="all" className="space-y-8">
              {filteredAllPosts.length === 0 ? (
                <Card className="bg-card border border-border p-12">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2" data-testid="text-no-all-posts">No posts found</h3>
                    <p className="text-muted-foreground" data-testid="text-no-all-posts-description">
                      {searchTerm || categoryFilter !== 'all' 
                        ? 'Try adjusting your search or filter criteria.'
                        : 'Create your first blog post to get started.'
                      }
                    </p>
                  </div>
                </Card>
              ) : (
                <Card className="bg-card border border-border">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full" data-testid="table-all-posts">
                        <thead className="border-b border-border">
                          <tr className="text-left">
                            <th className="p-4 font-semibold">Title</th>
                            <th className="p-4 font-semibold">Category</th>
                            <th className="p-4 font-semibold">Status</th>
                            <th className="p-4 font-semibold">Created</th>
                            <th className="p-4 font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {filteredAllPosts.map((post) => (
                            <tr key={post.id} data-testid={`row-all-post-${post.id}`}>
                              <td className="p-4">
                                <div>
                                  <div className="font-medium" data-testid={`text-all-title-${post.id}`}>
                                    {post.title}
                                  </div>
                                  <div className="text-sm text-muted-foreground" data-testid={`text-all-excerpt-${post.id}`}>
                                    {post.excerpt}
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">
                                <Badge className="bg-primary/10 text-primary" data-testid={`badge-all-category-${post.id}`}>
                                  {post.category}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <Badge className={post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} data-testid={`badge-all-status-${post.id}`}>
                                  {post.published ? 'Published' : 'Draft'}
                                </Badge>
                              </td>
                              <td className="p-4 text-muted-foreground" data-testid={`text-all-created-${post.id}`}>
                                {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'N/A'}
                              </td>
                              <td className="p-4">
                                <div className="flex gap-2">
                                  <Link href={`/blog/${post.slug}`}>
                                    <Button size="sm" variant="ghost" data-testid={`button-view-all-${post.id}`}>
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </Link>
                                  <Button size="sm" variant="ghost" data-testid={`button-edit-all-${post.id}`}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
