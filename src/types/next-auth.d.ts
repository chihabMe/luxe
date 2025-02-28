import "next-auth"
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: "admin" | "client";
  }

  interface Session {
    user: {
      id: string;
      role: "admin" | "client";
    } & DefaultSession["user"];
  }
}