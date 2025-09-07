import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { BlogPost, Comment, InsertBlogPost, InsertComment } from "@shared/schema";

export function useBlogPosts(publishedOnly = false) {
  return useQuery<BlogPost[]>({
    queryKey: publishedOnly ? ["/api/blog-posts", { published: "true" }] : ["/api/blog-posts"],
    queryFn: async () => {
      const url = publishedOnly ? "/api/blog-posts?published=true" : "/api/blog-posts";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch blog posts");
      return await response.json();
    },
  });
}

export function useBlogPost(id: string) {
  return useQuery<BlogPost>({
    queryKey: ["/api/blog-posts", id],
  });
}

export function useBlogPostBySlug(slug: string) {
  return useQuery<BlogPost>({
    queryKey: ["/api/blog-posts", "slug", slug],
    queryFn: async () => {
      const response = await fetch(`/api/blog-posts/slug/${slug}`);
      if (!response.ok) throw new Error("Failed to fetch blog post");
      return await response.json();
    },
  });
}

export function useCreateBlogPost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (post: InsertBlogPost) => {
      const response = await apiRequest("POST", "/api/blog-posts", post);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
    },
  });
}

export function useUpdateBlogPost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, post }: { id: string; post: Partial<InsertBlogPost> }) => {
      const response = await apiRequest("PUT", `/api/blog-posts/${id}`, post);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
    },
  });
}

export function useDeleteBlogPost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/blog-posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
    },
  });
}

export function useComments(postId: string) {
  return useQuery<Comment[]>({
    queryKey: ["/api/comments", postId],
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (comment: InsertComment) => {
      const response = await apiRequest("POST", "/api/comments", comment);
      return await response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/comments", variables.postId] });
    },
  });
}
