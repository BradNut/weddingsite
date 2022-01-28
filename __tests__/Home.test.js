import { render, screen } from '@testing-library/react';
import Home from '../pages';

describe('Index Page <Home />', () => {
  it('should render', () => {
    render(<Home />);
  });
});
