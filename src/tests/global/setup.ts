import path from "path";
import { DockerComposeEnvironment, Wait } from "testcontainers";
import { DBTestHelper } from "./DBTestHelper";

const globalAny: any = global;
const postgresContainerName = "postgres_1";
const composeFile = "docker-compose.yml";

export default async () => {
  const isArm = process.arch === 'arm64';
  console.log(`Building arch: ${process.arch}`);
  const composeFilePath = path.resolve(__dirname, "../../../");

  const compose = new DockerComposeEnvironment(composeFilePath, composeFile)
    .withEnv('POSTGRES_USER', DBTestHelper.config.username)
    .withEnv('POSTGRES_PASSWORD', DBTestHelper.config.password)
    .withEnv('POSTGIS', isArm ? 'gangstead/postgis:13-arm' : 'postgis/postgis')
    .withEnv('DB_PORT', String(DBTestHelper.config.port))
    .withWaitStrategy(postgresContainerName, Wait.forLogMessage('database system is ready to accept connections'));

  const environment = await compose.up();
  process.env.DB_PORT = String(environment.getContainer(postgresContainerName).getMappedPort(5432));
  globalAny.__DB_CONTAINER__ = environment;
}