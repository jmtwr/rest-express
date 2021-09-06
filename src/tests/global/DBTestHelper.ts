import { createConnection } from 'typeorm'
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"
import { connect, Database } from '../../plugins/db';

const execute = async (fns: (() => Promise<unknown>)[]) => {
  for (const fn of fns) {
    await fn();
  }
}

const SCHEMA_NAME = "public";
const DEFAULT_TIMEOUT = 20000;
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
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
  } as Required<PostgresConnectionOptions>,

  async initDb(schema = SCHEMA_NAME): Promise<Database> {
    await initSchema(schema);
    try {
      return connect(DBTestHelper.config);
    } finally {
      console.log("connected to db");
    }
  },
  beforeAll(...fns: (() => Promise<unknown>)[]) {
    jest.setTimeout(DEFAULT_TIMEOUT);

    beforeAll(async () => {
      try {
        await execute(fns)
      } finally {
        console.log("Setup complete")
      }
    })
  },
  afterAll(...fns: (() => Promise<unknown>)[]) {
    afterAll(async () => {
      await execute(fns);
    }, DEFAULT_TIMEOUT);
  }
}

const initSchema = async (schema: string) => {
  const cnt = await createConnection({ ...DBTestHelper.config, schema: undefined });
  await cnt.query(`CREATE SCHEMA ${schema}`);
  console.log(`Schema "${schema}" was created`);
  await cnt.runMigrations({ transaction: "none" });
  console.log("Migrations applied");
  await cnt.close();
}