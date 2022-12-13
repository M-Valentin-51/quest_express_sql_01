const database = require("./database");

const getUsers = (req, res) => {
  let sql =
    "select id, firstname , lastname , email, city , language from users";
  const sqlValue = [];
  const sqlParams = [];
  let parametre = Object.keys(req.query).length;

  if (parametre > 0) {
    sql += " where";
  }

  for (const elt in req.query) {
    sqlParams.push(` ${elt} = ? `);
    sqlValue.push(req.query[elt]);
  }
  for (let i = 0; i < sqlParams.length; i++) {
    if (i % 2 != 0) {
      sql += "and ";
    }
    sql += sqlParams[i];
  }

  database
    .query(sql, sqlValue)
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
    .query(
      "select id, firstname , lastname , email, city , language from users where id = ?",
      [id]
    )
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
  const { firstname, lastname, email, city, language, hashedPassword } =
    req.body;
  console.log(`setUser() hashedPassword : ${hashedPassword}`);

  database
    .query(
      "INSERT INTO users(firstname , lastname, email , city , language , hashedPassword) VALUES (?,?,?,?,?,?)",
      [firstname, lastname, email, city, language, hashedPassword]
    )
    .then(([result]) => {
      res.location(`api/users/id=${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving user");
    });
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const { firstname, lastname, email, city, language, hashedPassword } =
    req.body;

  database
    .query(
      "update users set firstname = ? , lastname = ? , email = ? , city = ? , language = ? , hashedPassword = ? where id = ?",
      [firstname, lastname, email, city, language, hashedPassword, id]
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
      res.status(500).send("Error editing user");
    });
};

const deleteUser = (req, res) => {
  const id = req.params.id;

  database
    .query("delete from users where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows == 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).Send("Error deleting the user");
    });
};
module.exports = {
  getUsers,
  getUserId,
  setUser,
  updateUser,
  deleteUser,
};
