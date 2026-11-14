import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";


const client = new MongoClient(process.env.DATABASE_URL!);
const db = client.db("bazardor");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  account: {
    accountLinking: {
      // ভিন্ন email হলেও social account লিংক করবে
      allowDifferentEmails: true,
      // লিংক হবে যাওয়ার provider (github) + যেখানে ঢুকব সেই provider (credential) — দুটোই trusted হতে হয়
      trustedProviders: ["github", "credential"],
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});