const validateUserRegister = (req, res, next) => {
  const { name, email, password, tos, newsletter } = req.body;
  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;
  const errors = [];

  if (name == null) {
    errors.push({ field: "name", message: "This field is required" });
  } else if (name.length >= 50 || name.length <= 2) {
    errors.push({
      field: "name",
      message:
        "Your name should contain less than 50 characters and more than 2 characters",
    });
  }

  if (!emailRegex.test(email)) {
    errors.push({ field: "email", message: "Invalid email" });
  }

  if (password == null) {
    errors.push({ field: "password", message: "This field is required" });
  } else if (password.length <= 10) {
    errors.push({
      field: "password",
      message: "Your password is not strong enough!",
    });
  }

  //Might need to Change
  if (tos == null) {
    errors.push({ field: "tos", message: "This field is required" });
  }

  //Might need to Change
  if (newsletter == null) {
    errors.push({ field: "newsletter", message: "This field is required" });
  }

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

const validateUserChanges = (req, res, next) => {
  const { name, email, password, tos, newsletter } = req.body;
  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;
  const errors = [];

  if (name == null) {
    errors.push({ field: "name", message: "This field is required" });
  } else if (name.length >= 50 || name.length <= 2) {
    errors.push({
      field: "name",
      message:
        "Your name should contain less than 50 characters and more than 2 characters",
    });
  }

  if (!emailRegex.test(email)) {
    errors.push({ field: "email", message: "Invalid email" });
  }
  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;
  const errors = [];

  if (password == null) {
    errors.push({ field: "password", message: "This field is required" });
  } else if (password.length <= 10) {
    errors.push({
      field: "password",
      message: "Your password is not that short! Think again :)",
    });
  }

  if (!emailRegex.test(email)) {
    errors.push({
      field: "email",
      message: "Woahhh, your email must be missing something eheh",
    });
  }
  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

const validateresetPass = (req, res, next) => {
  const { newpassword } = req.body;
  const errors = [];

  if (newpassword == null) {
    errors.push({ field: "newpassword", message: "This field is required" });
  } else if (newpassword.length <= 10) {
    errors.push({
      field: "newpassword",
      message: "Your password is not strong enough!",
    });
  }

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = {
  validateUserRegister,
  validateUserChanges,
  validateLogin,
  validateresetPass,
};
