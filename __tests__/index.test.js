import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

describe('Home', () => {
  it('renders home page', () => {
    render(<Home />);
  });
});
