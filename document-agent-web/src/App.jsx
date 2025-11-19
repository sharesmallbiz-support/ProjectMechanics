import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './layout/Layout';
import HomePage from './pages/HomePage';
import MethodologyPage from './pages/MethodologyPage';
import DocumentAgentPage from './pages/DocumentAgentPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  // Set default page title and meta tags
  useEffect(() => {
    document.title = 'Project Mechanics: Master the Art & Science of Project Management';

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Master project management with Project Mechanics - a proven methodology combining structured techniques and adaptive problem-solving for software development success. Learn PMI best practices.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Master project management with Project Mechanics - a proven methodology combining structured techniques and adaptive problem-solving for software development success. Learn PMI best practices.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Methodology Pages with Layout */}
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/:slug" element={<MethodologyPage />} />
        </Route>

        {/* Document Agent Tool - Standalone (no main layout, has its own) */}
        <Route path="/document-agent" element={<DocumentAgentPage />} />

        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
