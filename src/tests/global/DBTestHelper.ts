import { createConnection } from 'typeorm'
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"
import { connect, Database } from '../../plugins/db';

const execute = async (fns: (() => Promise<unknown>)[]) => {
  for (const fn of fns) {
    await fn();
  }
}

const SCHEMA_NAME = "public";
export const DBTestHelper = {
  config: {
    type: "postgres",
    host: "localhost",
    port: process.env.DB_PORT || 25432,
    username: "test",
    password: "test",
    database: "test",
    schema: SCHEMA_NAME,
    synchronize: false,
    logging: false,
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
  } as Required<PostgresConnectionOptions>,

  async initDb(schema = SCHEMA_NAME) {
    await initSchema(schema);
    return connect(DBTestHelper.config);
  }
}

export const initSchema = async (schema: string) => {
  const cnt = await createConnection({ ...(DBTestHelper.config) as Required<PostgresConnectionOptions>, schema: undefined });
  await cnt.query(`CREATE SCHEMA IF NOT EXISTS ${schema}`);
  await cnt.runMigrations({ transaction: "none" });
  console.log("Migrations applied");
  await cnt.close();
}