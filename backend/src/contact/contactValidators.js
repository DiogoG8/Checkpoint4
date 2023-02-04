const validateContactForm = (req, res, next) => {
  const { topic, issue, email } = req.body;
  const errors = [];
  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

  if (!emailRegex.test(email)) {
    errors.push({ field: "email", message: "Invalid email" });
  }

  if (topic == null) {
    errors.push({ field: "topic", message: "This field is required" });
  } else if (topic.length >= 255 || topic.length <= 5) {
    errors.push({
      field: "topic",
      message:
        "Your topic should contain less than 255 characters and more than 5 characters",
    });
  }

  if (issue == null) {
    errors.push({ field: "issue", message: "This field is required" });
  } else if (issue.length >= 50 || issue.length <= 10) {
    errors.push({
      field: "issue",
      message:
        "Your issue should contain less 50 characters and more than 10 characters",
    });
  }

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = {
  validateContactForm,
};
