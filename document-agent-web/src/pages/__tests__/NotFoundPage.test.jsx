import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';

describe('NotFoundPage Component', () => {
  const renderNotFoundPage = () => {
    return render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );
  };

  it('should render 404 error message', () => {
    renderNotFoundPage();

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('should display helpful error message', () => {
    renderNotFoundPage();

    expect(
      screen.getByText(/page you're looking for doesn't exist or has been moved/i)
    ).toBeInTheDocument();
  });

  it('should render link to homepage', () => {
    renderNotFoundPage();

    const homeLink = screen.getByText('Go Back Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('should render alert icon', () => {
    const { container } = renderNotFoundPage();

    // Check for icon container with proper styling
    const iconContainer = container.querySelector('.bg-red-100');
    expect(iconContainer).toBeInTheDocument();
  });

  it('should have centered layout', () => {
    const { container } = renderNotFoundPage();

    const mainContainer = container.querySelector('.min-h-screen');
    expect(mainContainer).toHaveClass('flex', 'items-center', 'justify-center');
  });
});
