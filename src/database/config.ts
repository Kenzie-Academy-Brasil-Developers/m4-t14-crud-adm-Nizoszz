import client from "./connection";

const connectDatabase = async (): Promise<void> => {
  await client.connect();
  console.log("Database is running :)");
};

export default connectDatabase;
