import app from "./app";
import { connectDatabase } from "./database";

const port: number = Number(process.env.PORT) || 3000;
const rngMsg: string = "Server is running :)";

app.listen(port, async (): Promise<void> => {
  await connectDatabase();
  console.log(rngMsg);
});
