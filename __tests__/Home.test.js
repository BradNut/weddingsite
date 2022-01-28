import { render, screen } from '@testing-library/react';
import HomePage from '../pages';

describe('Index Page <HomePage />', () => {
  it('should render', () => {
    render(<HomePage />);
  });
});
