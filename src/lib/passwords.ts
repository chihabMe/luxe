import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

// Function to hash the password using scrypt
export const hashPassword = async (password: string) => {
  const salt = randomBytes(16).toString("hex"); // Generate a random salt
  const hashedPassword = (await scryptAsync(password, salt, 64)) as Buffer; // Hash the password
  return `${salt}:${hashedPassword.toString("hex")}`; // Return the salt and the hash combined
};

// Function to verify the password
export const verifyPassword = async (password: string, storedHash: string) => {
  const [salt, hash] = storedHash.split(":"); // Split the stored salt and hash
  const hashedPassword = (await scryptAsync(password, salt, 64)) as Buffer; // Hash the input password with the stored salt
  return hashedPassword.toString("hex") === hash; // Compare the hashes
};
