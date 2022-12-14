const express = require("express");

require("dotenv").config();

const app = express();

const port = process.env.APP_PORT ?? 5000;

const movieHandlers = require("./movieHandlers");

const userHandlers = require("./userHandlers");

const { validateMovie, validateUser } = require("./validator");

app.use(express.json());

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", validateMovie, movieHandlers.setMovie);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserId);
app.post("/api/users", validateUser, userHandlers.setUser);
app.put("/api/users/:id", validateUser, userHandlers.updateUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
