import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(express.static("./public"));
app.use(express.json());
app.use(cors());

axios.defaults.baseURL = "https://api.deezer.com";

app.get("/api/chart", async (req, res) => {
  const { data } = await axios.get("/chart");
  res.status(200).json(data);
});

app.get("/api/chart/:type", async (req, res) => {
  const { data } = await axios.get(`/chart/${req.params.type}`);
  res.status(200).json(data);
});

app.get("/api/playlist/:id", async (req, res) => {
  const { data } = await axios.get(`/playlist/${req.params.id}`);
  res.status(200).json(data);
});

app.get("/api/playlist/:id/:tracks", async (req, res) => {
  const { id, tracks } = req.params;
  const { data } = await axios.get(`/playlist/${id}/${tracks}`);

  res.status(200).json(data);
});

app.get("/api/artist/:id", async (req, res) => {
  const { data } = await axios.get(`/artist/${req.params.id}`);
  res.status(200).json(data);
});

app.get("/api/artist/:id/top", async (req, res) => {
  const id = req.params?.id;
  const limit = req.query?.limit || 50;

  const { data } = await axios.get(`/artist/${id}/top?limit=${limit}`);
  res.status(200).json(data);
});

app.get("/api/search", async (req, res) => {
  const { data } = await axios.get(`/search`, { params: { q: req.query.q } });
  res.status(200).json(data);
});

app.listen(3000, console.log("server is running"));
