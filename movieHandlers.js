const database = require("./database");

const movies = [
  {
    id: 1,
    title: "Citizen Kane",
    director: "Orson Wells",
    year: "1941",
    colors: false,
    duration: 120,
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    colors: true,
    duration: 180,
  },
  {
    id: 3,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: "1994",
    color: true,
    duration: 180,
  },
];

const getMovies = (req, res) => {
  database
    .query("select * from movies")
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  //const movie = movies.find((movie) => movie.id === id);
  database
    .query(`select * from movies where id= ?`, [id])
    .then(([data]) => {
      if (data[0]) {
        res.json(data[0]);
      } else {
        res.status(500).send("Error retrieving data from database");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const setMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "INSERT INTO movies(title , director , year , color, duration) VALUES (?,?,?,?,?)",
      [title, director, year, color, duration]
    )
    .then(([err]) => {})
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movie");
    });
  //console.log(req.body);
  res.sendStatus(201);
};
module.exports = {
  getMovies,
  getMovieById,
  setMovie,
};
