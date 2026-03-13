import React from 'react';
import { render, screen } from '@testing-library/react';
import JobProgressBar from './JobProgressBar';

describe('JobProgressBar Component', () => {
  it('renders with default values', () => {
    render(<JobProgressBar />);
    expect(screen.getByText('30%')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveStyle({ width: '30%' });
  });

  it('renders with custom progress value', () => {
    render(<JobProgressBar progressValue={75} />);
    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveStyle({ width: '75%' });
  });

  it('clamps progress value between 0 and 100', () => {
    const { rerender } = render(<JobProgressBar progressValue={150} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveStyle({ width: '100%' });

    rerender(<JobProgressBar progressValue={-20} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveStyle({ width: '0%' });
  });

  it('returns null when progressShow is false', () => {
    const { container } = render(<JobProgressBar progressShow={false} />);
    expect(container.firstChild).toBeNull();
  });
});
