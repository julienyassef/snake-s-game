import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';  
import AnimatedSnake from './AnimatedSnake';

describe('Composant AnimatedSnake', () => {
  it('renders the canvas when `animate` is true', () => {
    render(<AnimatedSnake initialLength={5} animate={true} />);
    const canvas = screen.getByTestId('animated-snake-canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('don\'t render canvas when `animate` is false', () => {
    render(<AnimatedSnake initialLength={5} animate={false} />);
    expect(screen.queryByTestId('animated-snake-canvas')).not.toBeInTheDocument();
  });


  it('stops animation when `animate` is false', () => {
    const { rerender } = render(<AnimatedSnake initialLength={5} animate={true} />);
    
    rerender(<AnimatedSnake initialLength={5} animate={false} />);
    
    const canvas = screen.queryByTestId('animated-snake-canvas');
    expect(canvas).toBeNull();  
  });

});
