import express from "express";
import { getMovies } from "./database/mongodb";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("hello,woeld");
});

app.get("/movies", async (req, res) => {
  try {
    const { year, imdb } = await req.query;
    console.log("working", year, imdb);
    const movies = await getMovies(Number(year), Number(imdb));
    res.status(500).json({ message: "success", movies: movies });
  } catch (error) {
    res.status(500).json({ messege: "error", error });
  }
});

app.listen(port, () => {
  console.log(`Server runnnig on port ${port}`);
});
