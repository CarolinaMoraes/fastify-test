import { defineConfig } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { Migrator } from "@mikro-orm/migrations";
import dotenv from "dotenv";

dotenv.config();

// no need to specify the `driver` now, it will be inferred automatically
export default defineConfig({
  host: "database",
  dbName: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  // folder-based discovery setup, using common filename suffix
  entities: ["dist/**/*.entity.js"],
  entitiesTs: ["src/**/*.entity.ts"],
  metadataProvider: TsMorphMetadataProvider,
  // enable debug mode to log SQL queries and discovery information
  debug: true,
  extensions: [Migrator],
  migrations: {
    path: "dist/migrations",
    pathTs: "src/migrations",
  },
  forceUtcTimezone: true,
});
