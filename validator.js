const validateMovie = (req, res, next) => {
  // validate req.body then call next() if everything is ok
  const { title, director, year, color, duration } = req.body;
  const errors = [];

  if (title == null) {
    errors.push({ field: "title", message: "'title' is required" });
  } else if (title.length > 255) {
    errors.push({ field: "title", message: "'title' is too long" });
  }

  if (director == null) {
    errors.push({ field: "director", message: "'director' is required" });
  } else if (director.length > 255) {
    errors.push({ field: "director", message: "'director' is too long" });
  }

  if (year == null) {
    errors.push({ field: "year", message: "'year' is required" });
  } else if (year.length > 255) {
    errors.push({ field: "year", message: "'year' is too long" });
  }

  if (color == null) {
    errors.push({ field: "color", message: "'color' is required" });
  } else if (color.length > 255) {
    errors.push({ field: "color", message: "'color' is too long" });
  }

  if (duration == null) {
    errors.push({ field: "duration", message: "'duration' is required" });
  }

  if (errors.length == 0) {
    next();
  } else {
    let messageError = "";
    for (const err in errors) {
      messageError += `${errors[err].message}, `;
    }
    //res.status(422).send(`The fieds ${messageError}`);
    res.status(422).json({ validationError: errors });
  }
};

const validateUser = (req, res, next) => {
  const { email } = req.body;
  const errors = [];

  // ...

  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

  if (!emailRegex.test(email)) {
    errors.push({ field: "email", message: "Invalid email" });
  }

  // ...

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = {
  validateMovie,
  validateUser,
};
