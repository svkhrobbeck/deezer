const express = require("express");
const get = require("lodash/get");
const morgan = require("morgan");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "client")));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

axios.defaults.baseURL = "https://api.deezer.com";

app.get("*", async (req, res) => {
  const data = await axios.get(req.url, { params: req.query });
  res.status(200).json(get(data, "data"));
});

app.post("*", async (req, res) => {
  const data = await axios.post(req.url, req.body, { params: req.query });
  res.status(200).json(get(data, "data"));
});

app.listen(3000, () => console.log("server is running on port: 3000"));
