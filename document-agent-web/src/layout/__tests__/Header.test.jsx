import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';

describe('Header Component', () => {
  const renderHeader = () => {
    return render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  };

  it('should render the logo and site title', () => {
    renderHeader();

    expect(screen.getByText('Project Mechanics')).toBeInTheDocument();
    expect(screen.getByText(/Master the Art & Science/i)).toBeInTheDocument();
  });

  it('should render all navigation links', () => {
    renderHeader();

    const expectedLinks = [
      'Home',
      'Overview',
      'Project Life Cycle',
      'Leadership',
      'Change Management',
      'Document Agent'
    ];

    expectedLinks.forEach(linkText => {
      expect(screen.getByText(linkText)).toBeInTheDocument();
    });
  });

  it('should have correct navigation link hrefs', () => {
    renderHeader();

    const homeLink = screen.getAllByText('Home')[0].closest('a');
    expect(homeLink).toHaveAttribute('href', '/');

    const overviewLink = screen.getAllByText('Overview')[0].closest('a');
    expect(overviewLink).toHaveAttribute('href', '/overview');

    const docAgentLink = screen.getAllByText('Document Agent')[0].closest('a');
    expect(docAgentLink).toHaveAttribute('href', '/document-agent');
  });

  it('should render mobile menu button', () => {
    renderHeader();

    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toBeInTheDocument();
  });

  it('should toggle mobile menu on button click', () => {
    renderHeader();

    const menuButton = screen.getByLabelText('Toggle menu');

    // Menu should not be visible initially (check for duplicates indicating mobile menu)
    const homeLinks = screen.getAllByText('Home');
    expect(homeLinks.length).toBe(1); // Only desktop menu visible

    // Click to open
    fireEvent.click(menuButton);

    // Now we should see both desktop and mobile links
    const homeLinksMobile = screen.getAllByText('Home');
    expect(homeLinksMobile.length).toBe(2); // Desktop + mobile

    // Click to close
    fireEvent.click(menuButton);

    const homeLinksAfterClose = screen.getAllByText('Home');
    expect(homeLinksAfterClose.length).toBe(1); // Back to desktop only
  });

  it('should close mobile menu when navigation link is clicked', () => {
    renderHeader();

    const menuButton = screen.getByLabelText('Toggle menu');

    // Open mobile menu
    fireEvent.click(menuButton);

    // Get mobile menu links (second occurrence)
    const mobileOverviewLink = screen.getAllByText('Overview')[1];

    // Click a link
    fireEvent.click(mobileOverviewLink);

    // Menu should close - only desktop links remain
    const linksAfterClick = screen.getAllByText('Overview');
    expect(linksAfterClick.length).toBe(1);
  });

  it('should have sticky positioning class', () => {
    const { container } = renderHeader();

    const header = container.querySelector('header');
    expect(header).toHaveClass('sticky');
  });

  it('should render logo with icon', () => {
    renderHeader();

    // Check that the FileText icon container exists
    const iconContainer = screen.getByText('Project Mechanics').closest('a')?.querySelector('div');
    expect(iconContainer).toHaveClass('bg-primary-600');
  });
});
