import React from 'react';
import { render } from '@testing-library/react';
import FloatingIcons from './FloatingIcons';

describe('FloatingIcons Component', () => {
  it('renders finance icons by default', () => {
    const { container } = render(<FloatingIcons type="finance" />);
    const icons = container.querySelectorAll('i');
    expect(icons.length).toBe(4);
    expect(icons[0]).toHaveClass('fa-chart-line');
  });

  it('renders construction icons', () => {
    const { container } = render(<FloatingIcons type="construction" />);
    const icons = container.querySelectorAll('i');
    expect(icons.length).toBe(4);
    expect(icons[0]).toHaveClass('fa-hammer');
  });

  it('returns null when type is none', () => {
    const { container } = render(<FloatingIcons type="none" />);
    expect(container.firstChild).toBeNull();
  });
});
