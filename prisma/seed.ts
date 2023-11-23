import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	console.log(`Start seeding ...`);

	console.log("Creating roles ...");
	const existingRoles = await prisma.role.findMany();
	if (existingRoles.length === 0) {
		await prisma.role.createMany({
			data: [{ name: "admin" }, { name: "guest" }],
		});
		console.log("Roles created.");
	} else {
		console.log("Roles already exist. No action taken.");
	}

	console.log('Creating Permissions...')
	const existingPermissions = await prisma.permission.findMany();
	if (existingPermissions.length === 0) {
		
	}
}

main()
	.catch(async (e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
