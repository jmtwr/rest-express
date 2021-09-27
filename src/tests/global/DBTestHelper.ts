import { createConnection } from 'typeorm'
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"
import { connect, Database } from '../../plugins/db';

const execute = async (fns: (() => Promise<unknown>)[]) => {
  for (const fn of fns) {
    await fn();
  }
}

export const DBTestHelper = {
  config: {
    type: "postgres",
    host: "localhost",
    port: process.env.DB_PORT || 25432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: false,
    logging: false,
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
  } as Required<PostgresConnectionOptions>,

  async initDb() {
    await initSchema();
    return await connect(DBTestHelper.config);
  }
}

export const initSchema = async () => {
  const cnt = await createConnection({ ...(DBTestHelper.config) as Required<PostgresConnectionOptions>, schema: undefined });
  await cnt.runMigrations({ transaction: "none" });
  console.log("Migrations applied");
  await cnt.close();
}