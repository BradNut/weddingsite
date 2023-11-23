import React from "react";
import Form from "@/components/form";
import Link from 'next/link';

const Page = async () => {
	return (
		<>
			<h1>Sign up</h1>
			<Form action="/api/signup">
				<label htmlFor="username">Username</label>
				<input name="username" id="username" />
				<br />
				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" />
				<br />
				<label htmlFor="admin_password">Admin Password</label>
				<input type="password" name="admin_password" id="admin_password" />
				<br />
				<input type="submit" />
			</Form>
			<Link href="/login">Login</Link>
		</>
	);
}

export default Page;
