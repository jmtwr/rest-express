import { GenericContainer } from "testcontainers";
import { DBTestHelper } from "./DBTestHelper";

const globalAny: any = global;

export default async () => {
  const container = new GenericContainer("postgres")
    .withEnv('POSTGRES_USER', DBTestHelper.config.username)
    .withEnv('POSTGRES_PASSWORD', String(DBTestHelper.config.password))
    .withEnv('DB_PORT', String(DBTestHelper.config.port))
    .withExposedPorts(5432);

  const environment = await container.start();
  process.env.DB_PORT = String(environment.getMappedPort(5432));
  globalAny.__DB_CONTAINER__ = environment;
}