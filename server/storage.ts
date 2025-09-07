import { 
  type User, type InsertUser, type Program, type InsertProgram,
  type Project, type InsertProject, type Task, type InsertTask,
  type BlogPost, type InsertBlogPost, type Comment, type InsertComment,
  type Media, type InsertMedia
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Programs
  getPrograms(): Promise<Program[]>;
  getProgram(id: string): Promise<Program | undefined>;
  createProgram(program: InsertProgram): Promise<Program>;
  updateProgram(id: string, program: Partial<InsertProgram>): Promise<Program | undefined>;
  deleteProgram(id: string): Promise<boolean>;
  
  // Projects
  getProjects(): Promise<Project[]>;
  getProjectsByProgram(programId: string): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;
  
  // Tasks
  getTasks(): Promise<Task[]>;
  getTasksByProject(projectId: string): Promise<Task[]>;
  getTask(id: string): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: string, task: Partial<InsertTask>): Promise<Task | undefined>;
  deleteTask(id: string): Promise<boolean>;
  
  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
  
  // Comments
  getCommentsByPost(postId: string): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  deleteComment(id: string): Promise<boolean>;
  
  // Media
  getMedia(): Promise<Media[]>;
  createMedia(media: InsertMedia): Promise<Media>;
  deleteMedia(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private programs: Map<string, Program>;
  private projects: Map<string, Project>;
  private tasks: Map<string, Task>;
  private blogPosts: Map<string, BlogPost>;
  private comments: Map<string, Comment>;
  private media: Map<string, Media>;

  constructor() {
    this.users = new Map();
    this.programs = new Map();
    this.projects = new Map();
    this.tasks = new Map();
    this.blogPosts = new Map();
    this.comments = new Map();
    this.media = new Map();
    
    this.seedData();
  }

  private seedData() {
    // Create sample users
    const users = [
      {
        id: "1",
        username: "mark.hazleton",
        password: "password123",
        email: "mark@projectmechanics.com",
        fullName: "Mark Hazleton",
        role: "admin",
        createdAt: new Date(),
      },
      {
        id: "2",
        username: "sarah.johnson",
        password: "password123",
        email: "sarah@projectmechanics.com",
        fullName: "Sarah Johnson",
        role: "manager",
        createdAt: new Date(),
      },
      {
        id: "3",
        username: "alex.chen",
        password: "password123",
        email: "alex@projectmechanics.com",
        fullName: "Alex Chen",
        role: "user",
        createdAt: new Date(),
      },
    ];

    users.forEach(user => this.users.set(user.id, user));

    // Create sample programs
    const programs = [
      {
        id: "prog1",
        name: "Digital Transformation",
        description: "Modernizing legacy systems and processes",
        status: "active",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-12-31"),
        managerId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "prog2",
        name: "Infrastructure Modernization",
        description: "Upgrading IT infrastructure and cloud migration",
        status: "active",
        startDate: new Date("2024-03-01"),
        endDate: new Date("2025-02-28"),
        managerId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    programs.forEach(program => this.programs.set(program.id, program));

    // Create sample projects
    const projects = [
      {
        id: "proj1",
        name: "Customer Portal Redesign",
        description: "Redesign and modernize customer-facing portal",
        status: "active",
        progress: 75,
        programId: "prog1",
        managerId: "1",
        startDate: new Date("2024-09-01"),
        endDate: new Date("2024-12-15"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "proj2",
        name: "API Integration Platform",
        description: "Build centralized API integration platform",
        status: "planning",
        progress: 25,
        programId: "prog2",
        managerId: "2",
        startDate: new Date("2024-11-01"),
        endDate: new Date("2025-01-30"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    projects.forEach(project => this.projects.set(project.id, project));

    // Create sample tasks
    const tasks = [
      {
        id: "task1",
        title: "Update user authentication flow",
        description: "Implement OAuth 2.0 authentication",
        status: "in-progress",
        priority: "high",
        projectId: "proj1",
        assigneeId: "3",
        dueDate: new Date("2024-12-10"),
        completedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "task2",
        title: "Database migration testing",
        description: "Test database migration scripts",
        status: "completed",
        priority: "medium",
        projectId: "proj1",
        assigneeId: "2",
        dueDate: new Date("2024-11-30"),
        completedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    tasks.forEach(task => this.tasks.set(task.id, task));

    // Create sample blog posts
    const blogPosts = [
      {
        id: "post1",
        title: "Effective Stakeholder Communication Strategies",
        slug: "effective-stakeholder-communication-strategies",
        content: "Learn how to master the art of communication with clients, staff, and management throughout the project lifecycle...",
        excerpt: "Learn how to master the art of communication with clients, staff, and management throughout the project lifecycle.",
        featuredImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Project Management",
        tags: ["communication", "stakeholders", "project management"],
        authorId: "1",
        published: true,
        publishedAt: new Date("2024-12-05"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "post2",
        title: "PMI Framework Integration in Practice",
        slug: "pmi-framework-integration-in-practice",
        content: "Discover how to seamlessly integrate PMI standards with Project Mechanics methodology for better outcomes...",
        excerpt: "Discover how to seamlessly integrate PMI standards with Project Mechanics methodology for better outcomes.",
        featuredImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Best Practices",
        tags: ["PMI", "framework", "methodology"],
        authorId: "2",
        published: true,
        publishedAt: new Date("2024-12-01"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    blogPosts.forEach(post => this.blogPosts.set(post.id, post));
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      role: insertUser.role || "user",
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  // Program methods
  async getPrograms(): Promise<Program[]> {
    return Array.from(this.programs.values());
  }

  async getProgram(id: string): Promise<Program | undefined> {
    return this.programs.get(id);
  }

  async createProgram(insertProgram: InsertProgram): Promise<Program> {
    const id = randomUUID();
    const program: Program = {
      ...insertProgram,
      id,
      description: insertProgram.description || null,
      status: insertProgram.status || "active",
      startDate: insertProgram.startDate || null,
      endDate: insertProgram.endDate || null,
      managerId: insertProgram.managerId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.programs.set(id, program);
    return program;
  }

  async updateProgram(id: string, update: Partial<InsertProgram>): Promise<Program | undefined> {
    const program = this.programs.get(id);
    if (!program) return undefined;
    
    const updated: Program = {
      ...program,
      ...update,
      updatedAt: new Date(),
    };
    this.programs.set(id, updated);
    return updated;
  }

  async deleteProgram(id: string): Promise<boolean> {
    return this.programs.delete(id);
  }

  // Project methods
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectsByProgram(programId: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(p => p.programId === programId);
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = {
      ...insertProject,
      id,
      description: insertProject.description || null,
      status: insertProject.status || "planning",
      progress: insertProject.progress || 0,
      programId: insertProject.programId || null,
      managerId: insertProject.managerId || null,
      startDate: insertProject.startDate || null,
      endDate: insertProject.endDate || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: string, update: Partial<InsertProject>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updated: Project = {
      ...project,
      ...update,
      updatedAt: new Date(),
    };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Task methods
  async getTasks(): Promise<Task[]> {
    return Array.from(this.tasks.values());
  }

  async getTasksByProject(projectId: string): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(t => t.projectId === projectId);
  }

  async getTask(id: string): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = randomUUID();
    const task: Task = {
      ...insertTask,
      id,
      description: insertTask.description || null,
      status: insertTask.status || "todo",
      priority: insertTask.priority || "medium",
      projectId: insertTask.projectId || null,
      assigneeId: insertTask.assigneeId || null,
      dueDate: insertTask.dueDate || null,
      createdAt: new Date(),
      updatedAt: new Date(),
      completedAt: null,
    };
    this.tasks.set(id, task);
    return task;
  }

  async updateTask(id: string, update: Partial<InsertTask>): Promise<Task | undefined> {
    const task = this.tasks.get(id);
    if (!task) return undefined;
    
    const updated: Task = {
      ...task,
      ...update,
      updatedAt: new Date(),
      completedAt: update.status === "completed" ? new Date() : task.completedAt,
    };
    this.tasks.set(id, updated);
    return updated;
  }

  async deleteTask(id: string): Promise<boolean> {
    return this.tasks.delete(id);
  }

  // Blog Post methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(p => p.published);
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(p => p.slug === slug);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const post: BlogPost = {
      ...insertPost,
      id,
      excerpt: insertPost.excerpt || null,
      featuredImage: insertPost.featuredImage || null,
      tags: insertPost.tags || null,
      authorId: insertPost.authorId || null,
      published: insertPost.published !== undefined ? insertPost.published : false,
      publishedAt: insertPost.published ? new Date() : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async updateBlogPost(id: string, update: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const post = this.blogPosts.get(id);
    if (!post) return undefined;
    
    const updated: BlogPost = {
      ...post,
      ...update,
      published: update.published !== undefined ? update.published : post.published,
      publishedAt: update.published && !post.publishedAt ? new Date() : post.publishedAt,
      updatedAt: new Date(),
    };
    this.blogPosts.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  // Comment methods
  async getCommentsByPost(postId: string): Promise<Comment[]> {
    return Array.from(this.comments.values()).filter(c => c.postId === postId);
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = randomUUID();
    const comment: Comment = {
      ...insertComment,
      id,
      authorId: insertComment.authorId || null,
      postId: insertComment.postId || null,
      parentId: insertComment.parentId || null,
      createdAt: new Date(),
    };
    this.comments.set(id, comment);
    return comment;
  }

  async deleteComment(id: string): Promise<boolean> {
    return this.comments.delete(id);
  }

  // Media methods
  async getMedia(): Promise<Media[]> {
    return Array.from(this.media.values());
  }

  async createMedia(insertMedia: InsertMedia): Promise<Media> {
    const id = randomUUID();
    const media: Media = {
      ...insertMedia,
      id,
      metadata: insertMedia.metadata || null,
      uploaderId: insertMedia.uploaderId || null,
      createdAt: new Date(),
    };
    this.media.set(id, media);
    return media;
  }

  async deleteMedia(id: string): Promise<boolean> {
    return this.media.delete(id);
  }
}

export const storage = new MemStorage();
