import { NavLink } from './NavLink';
import NavStyles from './styles/NavStyles';

export default function Nav() {
  return (
    <NavStyles>
      <NavLink href="/">
        <a>Home</a>
      </NavLink>
      <NavLink href="/cats">
        <a>Our Cats</a>
      </NavLink>
      <NavLink href="/party">
        <a>Wedding Party</a>
      </NavLink>
      <NavLink href="/photos">
        <a>Photos</a>
      </NavLink>
      <NavLink href="/travelstay">
        <a>Travel & Stay</a>
      </NavLink>
      <NavLink href="/qanda">
        <a>Q + A</a>
      </NavLink>
      <NavLink href="/rsvp">
        <a>RSVP</a>
      </NavLink>
    </NavStyles>
  );
}
