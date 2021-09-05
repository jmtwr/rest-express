import { Connection, ConnectionOptions, createConnection, getConnectionOptions, Repository } from "typeorm";
import "reflect-metadata";
import { UserEnt } from "../entities/UserEnt";

export interface Database {
  connection: Connection;
  userRepo: Repository<UserEnt>
}

export const connect = async (options?: Partial<ConnectionOptions>): Promise<Database> => {
  try {
    const defaultOptions = await getConnectionOptions();
    const opt = (options ? options : {}) as ConnectionOptions;
    const connection = await createConnection(Object.assign(defaultOptions, opt));
    console.log("Connected to DB", process.env.TYPEORM_HOST);

    return {
      connection,
      userRepo: connection.getRepository(UserEnt)
    }
  } catch (error) {
    console.log("connection db error", error);
    throw error;
  }
}