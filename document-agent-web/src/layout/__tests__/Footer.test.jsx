import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../Footer';

describe('Footer Component', () => {
  const renderFooter = () => {
    return render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
  };

  it('should render the about section', () => {
    renderFooter();

    expect(screen.getByText('About Project Mechanics')).toBeInTheDocument();
    expect(screen.getByText(/proven methodology/i)).toBeInTheDocument();
  });

  it('should render quick links section', () => {
    renderFooter();

    expect(screen.getByText('Quick Links')).toBeInTheDocument();

    const expectedLinks = [
      'Overview',
      'Project Life Cycle',
      'Leadership Skills',
      'Change Management',
      'Conflict Management',
      'Document Agent'
    ];

    expectedLinks.forEach(linkText => {
      expect(screen.getByText(linkText)).toBeInTheDocument();
    });
  });

  it('should render connect section with external links', () => {
    renderFooter();

    expect(screen.getByText('Connect')).toBeInTheDocument();

    const marksBlog = screen.getByText("Mark's Blog");
    expect(marksBlog).toHaveAttribute('href', 'https://markhazleton.com');
    expect(marksBlog).toHaveAttribute('target', '_blank');
    expect(marksBlog).toHaveAttribute('rel', 'noopener noreferrer');

    const linkedin = screen.getByText('LinkedIn');
    expect(linkedin).toHaveAttribute('href', 'https://www.linkedin.com/in/markhazleton/');

    const github = screen.getByText('GitHub');
    expect(github).toHaveAttribute('href', 'https://github.com/markhazleton');
  });

  it('should display current year in copyright', () => {
    renderFooter();

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
    expect(screen.getByText(/Mark Hazleton.*All rights reserved/i)).toBeInTheDocument();
  });

  it('should have proper link structure', () => {
    renderFooter();

    const overviewLink = screen.getByText('Overview').closest('a');
    expect(overviewLink).toHaveAttribute('href', '/overview');

    const docAgentLink = screen.getByText('Document Agent').closest('a');
    expect(docAgentLink).toHaveAttribute('href', '/document-agent');
  });

  it('should have grid layout classes', () => {
    const { container } = renderFooter();

    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toHaveClass('md:grid-cols-3');
  });
});
