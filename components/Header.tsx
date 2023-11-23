import React from "react";
import Link from "next/link";
import styles from '@/styles/layout.module.scss';
// import useWeddingStart from "@/lib/useWeddingStart";
// import WeddingStart from "./WeddingStart";
import Nav from "./Nav";

export default function Header() {
	// const { user } = useUser();
	// const { timeAsDays, pastWeddingDate } = useWeddingStart({
	// 	update: 60000,
	// });

	return (
		<header className={styles.header}>
			<div>
				<Link href="/">
					<h1 className="center">Name & Name</h1>
				</Link>
				{/* {user && user.isLoggedIn === true && !pastWeddingDate ? (
					<>
						<h2 className="center">June 3rd, 2030 @ New York, New York</h2>
						<h3 className="center">
							Countdown: <WeddingStart /> days!
						</h3>
					</>
				) : (
					""
				)} */}
			</div>
			{/* {user && user.isLoggedIn === true ? <Nav /> : ""} */}
		</header>
	);
}
