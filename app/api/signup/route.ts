import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { NextResponse } from "next/server";
import { add_user_to_role } from '@/lib/roles';

import type { NextRequest } from "next/server";

type VercelPostgresError = {
	code: string;
	detail: string;
	schema?: string;
	table?: string;
	column?: string;
	dataType?: string;
	constraint?: "auth_user_username_key";
};

export const POST = async (request: NextRequest) => {
	const formData = await request.formData();
	const username = formData.get("username");
	const password = formData.get("password");
	const adminPassword = formData.get("admin_password");

	if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD) {
		return NextResponse.json(
			{
				error: "Failed to create user",
			},
			{
				status: 400
			}
		);
	}

	// basic check
	if (
		typeof username !== "string" ||
		username.length < 4 ||
		username.length > 31
	) {
		return NextResponse.json(
			{
				error: "Invalid username"
			},
			{
				status: 400
			}
		);
	}
	if (
		typeof password !== "string" ||
		password.length < 6 ||
		password.length > 255
	) {
		return NextResponse.json(
			{
				error: "Invalid password"
			},
			{
				status: 400
			}
		);
	}
	try {
		const user = await auth.createUser({
			key: {
				providerId: "username", // auth method
				providerUserId: username.toLowerCase(), // unique id when using "username" auth method
				password // hashed by Lucia
			},
			attributes: {
				username
			}
		});

		console.log(`User created: ${JSON.stringify(user, null, 2)}`);

		add_user_to_role(user.userId, 'admin');

		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});
		const authRequest = auth.handleRequest(request.method, context);
		authRequest.setSession(session);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/" // redirect to profile page
			}
		});
	} catch (e) {
		console.log(`Error: ${e}`);

		// this part depends on the database you're using
		// check for unique constraint error in user table
		const maybeVercelPostgresError = (
			typeof e === 'object' ? e : {}
		) as Partial<VercelPostgresError>;

		// error code for unique constraint violation
		if (maybeVercelPostgresError.code === "23505") {
			return NextResponse.json(
				{
					error: "Username already taken"
				},
				{
					status: 400
				}
			);
		}

		return NextResponse.json(
			{
				error: "An unknown error occurred"
			},
			{
				status: 500
			}
		);
	}
}
