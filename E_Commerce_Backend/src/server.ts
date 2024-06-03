import app from "./app.js"
import dotenv from "dotenv";
import connectDatabase from "./utils/ConnectDBS.js";


// Env Files Access
dotenv.config({
  path: "./config/config.env",
});

// Connect DataBase
connectDatabase()

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is Working http://localhost:${port}`);
});
