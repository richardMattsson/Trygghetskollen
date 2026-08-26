import express from "express";
import userRoutes from "./Routes/userRoutes";
import wallpostsRoutes from "./Routes/wallpostsRoutes";
import testRoutes from "./Routes/testRoutes";
import testResultRoutes from "./Routes/testResultRoutes";
import { timeLog } from "./middleware/timelog";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3001;

app.use("/api/users", timeLog, userRoutes);

app.use("/api/wallPosts", timeLog, wallpostsRoutes);

app.use("/api/test", timeLog, testRoutes);

app.use("/api/testResult", timeLog, testResultRoutes);

app.listen(port, () => {
  console.log(`Redo på port http://localhost:${port}/`);
});
