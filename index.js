import express from "express";
import morgan from "morgan";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(express.static("./client"));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

axios.defaults.baseURL = "https://api.deezer.com";

app.get("*", async (req, res) => {
  const data = await axios.get(req.url);
  res.status(200).json(data.data);
});

app.listen(3000, () => console.log("server is running on port: 3000"));
