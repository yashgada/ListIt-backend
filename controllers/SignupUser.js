const UserModel = require("../model/UserModel");

const SignupUser = async (req, res) => {
  //   console.log({ body: req.body });
  // Making an error string to send in response
  let errorString = "";
  const { firstName, lastName, password, email } = req.body;
  if (!firstName || firstName.length < 1) {
    errorString += "First name";
  }
  if (!lastName || lastName.length < 1) {
    if (errorString) errorString += ", ";
    errorString += "Last name";
  }
  if (!password || password.length < 1) {
    if (errorString) errorString += ", ";
    errorString += "Password";
  }
  if (!email || email.length < 1) {
    if (errorString) errorString += ", ";
    errorString += "Email";
  }
  if (errorString) res.status(401).end(errorString.trim() + " Missing.");
  //   else res.status(201).send({ firstName, lastName, password, email });

  //   todo
  // check email pattern
  if (
    !email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    res.status(401).end("Email misformed");
    console.log("bad email received");
    return;
  }
  // Going ahead after validation
  try {
    const newUser = await UserModel.create({
      firstName:
        firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase(),
      lastName:
        lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase(),
      password,
      email: email.toLowerCase(),
    });
    console.log({ newUser });
    res.status(201).send({ newUser });
  } catch (error) {
    console.log({ error });
  }
};

module.exports = SignupUser;
