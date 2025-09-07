import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, Eye, Edit, Trash2, Search, Filter, Calendar, 
  Users, ClipboardList, TrendingUp, AlertCircle 
} from "lucide-react";
import { useProjects, useTasks, usePrograms } from "@/hooks/use-projects";
import { useState } from "react";

export default function PMO() {
  const { data: programs = [], isLoading: programsLoading } = usePrograms();
  const { data: projects = [], isLoading: projectsLoading } = useProjects();
  const { data: tasks = [], isLoading: tasksLoading } = useTasks();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const stats = {
    activePrograms: programs.filter(p => p.status === 'active').length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    openTasks: tasks.filter(t => t.status !== 'completed').length,
    completedTasks: tasks.filter(t => t.status === 'completed').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'on-hold':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (programsLoading || projectsLoading || tasksLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="flex justify-center items-center min-h-[60vh]" data-testid="text-pmo-loading">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground">Loading PMO Dashboard...</p>
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
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6" data-testid="text-pmo-hero-title">
              Project Management <span className="text-yellow-300">Office</span>
            </h1>
            <p className="text-lg lg:text-xl opacity-90 mb-8 leading-relaxed max-w-4xl mx-auto" data-testid="text-pmo-hero-description">
              Comprehensive project management office application with program management, task tracking, and status reporting capabilities.
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Stats */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-6">
            <Card className="bg-card border border-border" data-testid="card-pmo-stat-programs">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Programs</p>
                    <p className="text-3xl font-bold text-primary" data-testid="text-pmo-active-programs">
                      {stats.activePrograms}
                    </p>
                  </div>
                  <ClipboardList className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border border-border" data-testid="card-pmo-stat-projects">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                    <p className="text-3xl font-bold text-green-600" data-testid="text-pmo-active-projects">
                      {stats.activeProjects}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border border-border" data-testid="card-pmo-stat-open-tasks">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Open Tasks</p>
                    <p className="text-3xl font-bold text-orange-600" data-testid="text-pmo-open-tasks">
                      {stats.openTasks}
                    </p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border border-border" data-testid="card-pmo-stat-completed-tasks">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed Tasks</p>
                    <p className="text-3xl font-bold text-blue-600" data-testid="text-pmo-completed-tasks">
                      {stats.completedTasks}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid w-full grid-cols-3" data-testid="tabs-pmo-navigation">
              <TabsTrigger value="projects" data-testid="tab-projects">Projects</TabsTrigger>
              <TabsTrigger value="tasks" data-testid="tab-tasks">Tasks</TabsTrigger>
              <TabsTrigger value="programs" data-testid="tab-programs">Programs</TabsTrigger>
            </TabsList>
            
            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="flex flex-1 gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                      data-testid="input-search-projects"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]" data-testid="select-status-filter">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="flex items-center gap-2" data-testid="button-pmo-add-project">
                  <Plus className="h-4 w-4" />
                  Add Project
                </Button>
              </div>
              
              <Card className="bg-card border border-border">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full" data-testid="table-pmo-projects">
                      <thead className="border-b border-border">
                        <tr className="text-left">
                          <th className="p-4 font-semibold">Project Name</th>
                          <th className="p-4 font-semibold">Status</th>
                          <th className="p-4 font-semibold">Progress</th>
                          <th className="p-4 font-semibold">Due Date</th>
                          <th className="p-4 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filteredProjects.map((project) => (
                          <tr key={project.id} data-testid={`row-pmo-project-${project.id}`}>
                            <td className="p-4">
                              <div>
                                <div className="font-medium" data-testid={`text-pmo-project-name-${project.id}`}>
                                  {project.name}
                                </div>
                                <div className="text-sm text-muted-foreground" data-testid={`text-pmo-project-description-${project.id}`}>
                                  {project.description}
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge className={getStatusColor(project.status)} data-testid={`badge-pmo-project-status-${project.id}`}>
                                {project.status}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="w-full max-w-[200px]">
                                <Progress value={project.progress} className="h-2" />
                                <div className="text-xs text-muted-foreground mt-1" data-testid={`text-pmo-project-progress-${project.id}`}>
                                  {project.progress}%
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-muted-foreground" data-testid={`text-pmo-project-due-date-${project.id}`}>
                              {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <Button size="sm" variant="ghost" data-testid={`button-pmo-view-project-${project.id}`}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost" data-testid={`button-pmo-edit-project-${project.id}`}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-destructive" data-testid={`button-pmo-delete-project-${project.id}`}>
                                  <Trash2 className="h-4 w-4" />
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
            </TabsContent>

            {/* Tasks Tab */}
            <TabsContent value="tasks" className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="flex flex-1 gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search tasks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                      data-testid="input-search-tasks"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]" data-testid="select-task-status-filter">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="flex items-center gap-2" data-testid="button-pmo-add-task">
                  <Plus className="h-4 w-4" />
                  Add Task
                </Button>
              </div>
              
              <Card className="bg-card border border-border">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full" data-testid="table-pmo-tasks">
                      <thead className="border-b border-border">
                        <tr className="text-left">
                          <th className="p-4 font-semibold">Task</th>
                          <th className="p-4 font-semibold">Priority</th>
                          <th className="p-4 font-semibold">Status</th>
                          <th className="p-4 font-semibold">Assignee</th>
                          <th className="p-4 font-semibold">Due Date</th>
                          <th className="p-4 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filteredTasks.map((task) => (
                          <tr key={task.id} data-testid={`row-pmo-task-${task.id}`}>
                            <td className="p-4">
                              <div>
                                <div className="font-medium" data-testid={`text-pmo-task-title-${task.id}`}>
                                  {task.title}
                                </div>
                                <div className="text-sm text-muted-foreground" data-testid={`text-pmo-task-description-${task.id}`}>
                                  {task.description}
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge className={getPriorityColor(task.priority)} data-testid={`badge-pmo-task-priority-${task.id}`}>
                                {task.priority}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <Badge className={getStatusColor(task.status)} data-testid={`badge-pmo-task-status-${task.id}`}>
                                {task.status}
                              </Badge>
                            </td>
                            <td className="p-4 text-muted-foreground" data-testid={`text-pmo-task-assignee-${task.id}`}>
                              {task.assigneeId || 'Unassigned'}
                            </td>
                            <td className="p-4 text-muted-foreground" data-testid={`text-pmo-task-due-date-${task.id}`}>
                              {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <Button size="sm" variant="ghost" data-testid={`button-pmo-view-task-${task.id}`}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost" data-testid={`button-pmo-edit-task-${task.id}`}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-destructive" data-testid={`button-pmo-delete-task-${task.id}`}>
                                  <Trash2 className="h-4 w-4" />
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
            </TabsContent>

            {/* Programs Tab */}
            <TabsContent value="programs" className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <h3 className="text-2xl font-bold" data-testid="text-pmo-programs-title">Programs Overview</h3>
                <Button className="flex items-center gap-2" data-testid="button-pmo-add-program">
                  <Plus className="h-4 w-4" />
                  Add Program
                </Button>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-6">
                {programs.map((program) => (
                  <Card key={program.id} className="bg-card border border-border" data-testid={`card-pmo-program-${program.id}`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl" data-testid={`text-pmo-program-name-${program.id}`}>
                            {program.name}
                          </CardTitle>
                          <p className="text-muted-foreground mt-2" data-testid={`text-pmo-program-description-${program.id}`}>
                            {program.description}
                          </p>
                        </div>
                        <Badge className={getStatusColor(program.status)} data-testid={`badge-pmo-program-status-${program.id}`}>
                          {program.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Start Date</p>
                            <p className="font-medium" data-testid={`text-pmo-program-start-date-${program.id}`}>
                              {program.startDate ? new Date(program.startDate).toLocaleDateString() : 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">End Date</p>
                            <p className="font-medium" data-testid={`text-pmo-program-end-date-${program.id}`}>
                              {program.endDate ? new Date(program.endDate).toLocaleDateString() : 'N/A'}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" data-testid={`button-pmo-view-program-${program.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" data-testid={`button-pmo-edit-program-${program.id}`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
