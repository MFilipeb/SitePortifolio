import React from 'react';
import { render, screen } from '@testing-library/react';
import LinkCard from './LinkCard';

describe('LinkCard Component', () => {
  const mockLink = {
    id: '1',
    title: 'LinkedIn',
    url: 'https://linkedin.com/in/filipe',
    iconType: 'linkedin',
  };

  const mockProfile = {
    btnStyle: 'outline',
  };

  it('renders the link title correctly', () => {
    render(<LinkCard link={mockLink} profile={mockProfile} />);
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
  });

  it('renders the correct URL', () => {
    render(<LinkCard link={mockLink} profile={mockProfile} />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', 'https://linkedin.com/in/filipe');
  });

  it('renders the "Meus Projetos" link with internal routing', () => {
    const projectLink = {
      ...mockLink,
      title: 'Meus Projetos',
    };
    render(<LinkCard link={projectLink} profile={mockProfile} />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/projetos');
    expect(linkElement).toHaveAttribute('target', '_self');
  });
});
