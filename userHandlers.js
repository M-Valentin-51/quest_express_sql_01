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
module.exports = {
  getUsers,
  getUserId,
};
