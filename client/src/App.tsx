import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Methodology from "@/pages/methodology";
import ProjectManagement from "@/pages/project-management";
import PortfolioManagement from "@/pages/portfolio-management";
import ChangeManagement from "@/pages/change-management";
import ConflictManagement from "@/pages/conflict-management";
import Leadership from "@/pages/leadership";
import Glossary from "@/pages/glossary";
import History from "@/pages/history";
import PMO from "@/pages/pmo";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/methodology" component={Methodology} />
      <Route path="/methodology/project-management" component={ProjectManagement} />
      <Route path="/methodology/portfolio-management" component={PortfolioManagement} />
      <Route path="/methodology/change-management" component={ChangeManagement} />
      <Route path="/methodology/conflict-management" component={ConflictManagement} />
      <Route path="/methodology/leadership" component={Leadership} />
      <Route path="/methodology/glossary" component={Glossary} />
      <Route path="/methodology/history" component={History} />
      <Route path="/pmo" component={PMO} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
