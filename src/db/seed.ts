import { hashPassword } from "@/lib/passwords";
import { db } from ".";
// import { productImage, products, users } from "./schema";
import * as dotenv from "dotenv";
import { users } from "./schema";
import { eq } from "drizzle-orm";
// import slugify from "slugify";
dotenv.config({
	path: ".env",
});

const registerAdminUser = async () => {
	const email = process.env.SUPERUSER_EMAIL;
	const password = process.env.SUPERUSER_PASSWORD;
	const name = process.env.SUPERUSER_NAME;
	if (!email || !password || !name) {
		throw new Error(" SUPERUSER CREDENTIALS ARE REQUIRED");
	}
	const hashed = await hashPassword(password);
	try {
		const exists = await db.query.users.findFirst({
			where: eq(users.email, email),
		});
		if (!exists) {
			await db.insert(users).values({
				email,
				name,
				password: hashed,
				role: "admin",
			});
		} else {
			console.log(`${email} already registered`);
		}
		console.log(`${name} ${email} has been registered `);
	} catch (err) {
		console.error(err);
	}
};

const seed = async () => {
	console.log("starting seeding the database");
	await registerAdminUser();
	// await seedProducts();
};

seed().catch((e) => {
	console.error(e);
	process.exit();
});
