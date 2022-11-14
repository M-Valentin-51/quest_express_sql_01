const { query } = require("./database");
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
  let sql = "select * from movies";
  const sqlValue = [];
  const sqlParams = [];
  let parametre = Object.keys(req.query).length;

  if (parametre > 0) {
    sql += " where ";
  }

  for (const elt in req.query) {
    if (elt == "max_duration") {
      sqlParams.push("duration <= ?");
      sqlValue.push(req.query[elt]);
    } else {
      sqlParams.push(` ${elt} = ? `);
      sqlValue.push(req.query[elt]);
    }
  }
  for (let i = 0; i < sqlParams.length; i++) {
    if (i % 2 != 0) {
      sql += "and ";
    }
    sql += sqlParams[i];
  }

  database
    .query(sql, sqlValue)
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
    .then(([result]) => {
      res.location(`api/movies/id=${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movie");
    });
  //console.log(req.body);
};

const updateMovie = (req, res) => {
  const id = req.params.id;
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "UPDATE movies set title =? , director = ? , year = ? , color = ? , duration = ? WHERE id = ?",
      [title, director, year, color, duration, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing movies");
    });
};

const deleteMovie = (req, res) => {
  const id = req.params.id;

  database
    .query("delete from movies where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows == 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the movie");
    });
};

module.exports = {
  getMovies,
  getMovieById,
  setMovie,
  updateMovie,
  deleteMovie,
};
