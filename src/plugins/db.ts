import { Connection, ConnectionOptions, createConnection, getConnectionOptions } from "typeorm";
import "reflect-metadata";

export interface Database {
  connection: Connection;
}

export const connect = async (options?: Partial<ConnectionOptions>): Promise<Database> => {
  try {
    const defaultOptions = await getConnectionOptions();
    const opt = (options ? options : {}) as ConnectionOptions;
    const connection = await createConnection(Object.assign(defaultOptions, opt));
    console.log("Connected to DB", process.env.TYPEORM_HOST);

    return {
      connection
    }
  } catch (error) {
    console.log("connection db error", error);
    throw error;
  }
}