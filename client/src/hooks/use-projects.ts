import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Program, Project, Task, InsertProgram, InsertProject, InsertTask } from "@shared/schema";

export function usePrograms() {
  return useQuery<Program[]>({
    queryKey: ["/api/programs"],
  });
}

export function useProgram(id: string) {
  return useQuery<Program>({
    queryKey: ["/api/programs", id],
  });
}

export function useCreateProgram() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (program: InsertProgram) => {
      const response = await apiRequest("POST", "/api/programs", program);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/programs"] });
    },
  });
}

export function useUpdateProgram() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, program }: { id: string; program: Partial<InsertProgram> }) => {
      const response = await apiRequest("PUT", `/api/programs/${id}`, program);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/programs"] });
    },
  });
}

export function useDeleteProgram() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/programs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/programs"] });
    },
  });
}

export function useProjects(programId?: string) {
  return useQuery<Project[]>({
    queryKey: programId ? ["/api/projects", { programId }] : ["/api/projects"],
    queryFn: async () => {
      const url = programId ? `/api/projects?programId=${programId}` : "/api/projects";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch projects");
      return await response.json();
    },
  });
}

export function useProject(id: string) {
  return useQuery<Project>({
    queryKey: ["/api/projects", id],
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (project: InsertProject) => {
      const response = await apiRequest("POST", "/api/projects", project);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, project }: { id: string; project: Partial<InsertProject> }) => {
      const response = await apiRequest("PUT", `/api/projects/${id}`, project);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
    },
  });
}

export function useTasks(projectId?: string) {
  return useQuery<Task[]>({
    queryKey: projectId ? ["/api/tasks", { projectId }] : ["/api/tasks"],
    queryFn: async () => {
      const url = projectId ? `/api/tasks?projectId=${projectId}` : "/api/tasks";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch tasks");
      return await response.json();
    },
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (task: InsertTask) => {
      const response = await apiRequest("POST", "/api/tasks", task);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, task }: { id: string; task: Partial<InsertTask> }) => {
      const response = await apiRequest("PUT", `/api/tasks/${id}`, task);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/tasks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    },
  });
}
