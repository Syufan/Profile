import NavLinks from '@/components/NavLinks';
import { render, screen, fireEvent } from '@testing-library/react';

describe('NavLinks', () => {
  it('should render all nav items', () => {
    render(<NavLinks />);
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('should have About active by default', () => {
    render(<NavLinks />)

    const aboutLink = screen.getByText('About').closest('a');
    expect(aboutLink).toHaveClass('text-white');
    });

    it('should call scrollTo when About is clicked', () => {
        window.scrollTo = jest.fn();
        render(<NavLinks />);

        fireEvent.click(screen.getByText('About'));

        expect(window.scrollTo).toHaveBeenCalledWith({
          top: 0,
          behavior: 'smooth'
        });
    });
});
