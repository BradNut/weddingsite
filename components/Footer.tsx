import React from "react";
import Link from "next/link";
import styles from "@/styles/layout.module.scss";

export default function Footer() {
	// const { user } = useUser();

	return (
		<footer className={styles.footer}>
			<div>
				<h2>
					<Link href="/">N & N</Link>
				</h2>
				{/* {user && user.isLoggedIn === true ? (
					<>
						<hr />
						<h3>06.03.2030</h3>
					</>
				) : (
					""
				)} */}
			</div>
			<div>
				<p>Created by Bradley Shellnut</p>
				<div>
					Icons made by{" "}
					<a href="https://www.freepik.com" title="Freepik">
						Freepik
					</a>{" "}
					from{" "}
					<a href="https://www.flaticon.com/" title="Flaticon">
						www.flaticon.com
					</a>
				</div>
			</div>
		</footer>
	);
}
