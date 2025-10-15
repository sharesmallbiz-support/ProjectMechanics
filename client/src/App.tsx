import { Router, Route, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
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

function App() {
  return (
    <TooltipProvider>
      <Router hook={useHashLocation}>
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
          <Route path="/:rest*" component={Home} />
        </Switch>
      </Router>
    </TooltipProvider>
  );
}

export default App;
