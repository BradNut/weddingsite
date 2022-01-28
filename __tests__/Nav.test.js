import { render, screen } from '@testing-library/react';
import Nav from '../components/Nav';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('<Nav/>', () => {
  it('Renders nav correctly and matches snapshot', () => {
    const router = { pathname: '/' };
    useRouter.mockReturnValue(router);
    const { container, debug } = render(<Nav />);
    expect(container).toMatchSnapshot();
    const link = screen.getByText('RSVP');
    expect(link).toHaveAttribute('href', '/rsvp');
  });
});
