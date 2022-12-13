const express = require("express");

require("dotenv").config();

const app = express();

const port = process.env.APP_PORT ?? 5000;

const movieHandlers = require("./movieHandlers");

const userHandlers = require("./userHandlers");

const { validateMovie, validateUser } = require("./validator");

const { hashPassword  , verifyPassword , verifyToken} = require("./auth.js");

app.use(express.json());

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

// Route public 

app.get("/", welcome);

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserId);
app.post("/api/users", hashPassword, validateUser, userHandlers.setUser);

app.post("/api/login" ,userHandlers.getUserByEmailWithPasswordAndPassToNext , verifyPassword)

// Route Protected 

app.use(verifyToken)

app.post("/api/movies" , validateMovie, movieHandlers.setMovie);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

app.put("/api/users/:id", hashPassword, validateUser, userHandlers.updateUser);
app.delete("/api/users/:id", userHandlers.deleteUser);


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
