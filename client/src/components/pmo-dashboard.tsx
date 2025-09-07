import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Eye, Edit, Plus } from "lucide-react";
import { useProjects, useTasks } from "@/hooks/use-projects";

export function PMODashboard() {
  const { data: projects = [], isLoading: projectsLoading } = useProjects();
  const { data: tasks = [], isLoading: tasksLoading } = useTasks();

  const stats = {
    activePrograms: 12,
    activeProjects: projects.length,
    openTasks: tasks.filter(task => task.status !== 'completed').length,
    onTimeDelivery: 89
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (projectsLoading || tasksLoading) {
    return <div className="flex justify-center p-8" data-testid="text-loading">Loading PMO Dashboard...</div>;
  }

  return (
    <section id="pmo" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" data-testid="text-pmo-title">
            PMO Application Dashboard
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-pmo-description">
            Comprehensive project management office tools for tracking programs, projects, tasks, and team performance.
          </p>
        </div>

        {/* Dashboard Overview */}
        <Card className="bg-card rounded-xl p-8 border border-border mb-12">
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-muted/50 rounded-lg p-6 text-center" data-testid="card-stat-programs">
                <div className="text-3xl font-bold text-primary mb-2" data-testid="text-active-programs">
                  {stats.activePrograms}
                </div>
                <div className="text-sm text-muted-foreground">Active Programs</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-6 text-center" data-testid="card-stat-projects">
                <div className="text-3xl font-bold text-green-600 mb-2" data-testid="text-active-projects">
                  {stats.activeProjects}
                </div>
                <div className="text-sm text-muted-foreground">Active Projects</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-6 text-center" data-testid="card-stat-tasks">
                <div className="text-3xl font-bold text-orange-600 mb-2" data-testid="text-open-tasks">
                  {stats.openTasks}
                </div>
                <div className="text-sm text-muted-foreground">Open Tasks</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-6 text-center" data-testid="card-stat-delivery">
                <div className="text-3xl font-bold text-purple-600 mb-2" data-testid="text-on-time-delivery">
                  {stats.onTimeDelivery}%
                </div>
                <div className="text-sm text-muted-foreground">On-Time Delivery</div>
              </div>
            </div>

            {/* Projects Table */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold" data-testid="text-projects-title">Projects Overview</h3>
              <Button className="flex items-center gap-2" data-testid="button-add-project">
                <Plus className="h-4 w-4" />
                Add Project
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full" data-testid="table-projects">
                <thead className="border-b border-border">
                  <tr className="text-left">
                    <th className="pb-3 font-semibold">Project Name</th>
                    <th className="pb-3 font-semibold">Program</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Progress</th>
                    <th className="pb-3 font-semibold">Due Date</th>
                    <th className="pb-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {projects.map((project) => (
                    <tr key={project.id} data-testid={`row-project-${project.id}`}>
                      <td className="py-4">
                        <div className="font-medium" data-testid={`text-project-name-${project.id}`}>
                          {project.name}
                        </div>
                        <div className="text-sm text-muted-foreground" data-testid={`text-project-description-${project.id}`}>
                          {project.description}
                        </div>
                      </td>
                      <td className="py-4 text-muted-foreground" data-testid={`text-project-program-${project.id}`}>
                        {project.programId || 'N/A'}
                      </td>
                      <td className="py-4">
                        <Badge className={getStatusColor(project.status)} data-testid={`badge-project-status-${project.id}`}>
                          {project.status}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <div className="w-full bg-muted rounded-full h-2">
                          <Progress value={project.progress} className="h-2" />
                        </div>
                        <div className="text-xs text-muted-foreground mt-1" data-testid={`text-project-progress-${project.id}`}>
                          {project.progress}%
                        </div>
                      </td>
                      <td className="py-4 text-muted-foreground" data-testid={`text-project-due-date-${project.id}`}>
                        {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" data-testid={`button-view-project-${project.id}`}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" data-testid={`button-edit-project-${project.id}`}>
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

        {/* Task Management Interface */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-card rounded-xl p-6 border border-border">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold" data-testid="text-recent-tasks-title">Recent Tasks</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-4">
                {tasks.slice(0, 5).map((task) => (
                  <div key={task.id} className="flex items-center p-3 bg-muted/30 rounded-lg" data-testid={`card-task-${task.id}`}>
                    <input 
                      type="checkbox" 
                      className="mr-3" 
                      checked={task.status === 'completed'}
                      data-testid={`checkbox-task-${task.id}`}
                      readOnly
                    />
                    <div className="flex-1">
                      <div className={`font-medium ${task.status === 'completed' ? 'line-through' : ''}`} data-testid={`text-task-title-${task.id}`}>
                        {task.title}
                      </div>
                      <div className="text-sm text-muted-foreground" data-testid={`text-task-assignee-${task.id}`}>
                        Assigned to: {task.assigneeId || 'Unassigned'}
                      </div>
                    </div>
                    <div className={`text-sm ${task.status === 'completed' ? 'text-green-600' : 'text-muted-foreground'}`} data-testid={`text-task-status-${task.id}`}>
                      {task.status === 'completed' ? 'Completed' : task.dueDate ? `Due: ${new Date(task.dueDate).toLocaleDateString()}` : 'No due date'}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card rounded-xl p-6 border border-border">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold" data-testid="text-project-timeline-title">Project Timeline</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-4">
                <div className="flex items-center" data-testid="timeline-item-1">
                  <div className="w-3 h-3 bg-primary rounded-full mr-4"></div>
                  <div className="flex-1">
                    <div className="font-medium">Requirements Gathering</div>
                    <div className="text-sm text-muted-foreground">Nov 1-15, 2024</div>
                  </div>
                </div>
                <div className="flex items-center" data-testid="timeline-item-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <div className="font-medium">Design Phase</div>
                    <div className="text-sm text-muted-foreground">Nov 16-30, 2024</div>
                  </div>
                </div>
                <div className="flex items-center" data-testid="timeline-item-3">
                  <div className="w-3 h-3 bg-muted border-2 border-primary rounded-full mr-4"></div>
                  <div className="flex-1">
                    <div className="font-medium">Development</div>
                    <div className="text-sm text-muted-foreground">Dec 1-31, 2024</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
