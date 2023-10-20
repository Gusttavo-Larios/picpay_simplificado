import { Database } from "bun:sqlite";

const connection = new Database(__dirname + "/database.sqlite");

export default connection;