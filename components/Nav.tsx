import { NavLink } from "./NavLink";
import NavStyles from "@/styles/NavStyles";

export default function Nav() {
	return (
		<NavStyles>
			<NavLink href="/">Home</NavLink>
			<NavLink href="/story">Our Story</NavLink>
			<NavLink href="/party">Wedding Party</NavLink>
			<NavLink href="/photos">Photos</NavLink>
			<NavLink href="/travelstay">Travel & Stay</NavLink>
			<NavLink href="/qanda">Q & A</NavLink>
			<NavLink href="/rsvp">RSVP</NavLink>
		</NavStyles>
	);
}
