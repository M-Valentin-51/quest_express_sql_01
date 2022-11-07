const database = require("./database");

const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500);
    });
};

const getUserId = (req, res) => {
  const id = req.params.id;

  database
    .query("select * from users where id = ?", [id])
    .then(([user]) => {
      if (user.length) {
        res.status(200).json(user);
      } else {
        res.status(404).send("Not found");
      }
    })
    .catch((err) => {
      res.status(500);
    });
};

const setUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "INSERT INTO users(firstname , lastname, email , city , language) VALUES (?,?,?,?,?)",
      [firstname, lastname, email, city, language]
    )
    .then(([err]) => {
      res.location(`api/users/id=${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving user");
    });
};
module.exports = {
  getUsers,
  getUserId,
  setUser,
};
