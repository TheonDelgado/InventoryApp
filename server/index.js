import express from "express";
import { router } from "./routes/api.js";
import cors from "cors";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.use("/", router);

app.listen(3001, () => {
    console.log("Server started on port 3001");
})