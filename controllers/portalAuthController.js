const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


require("../models/PortalAdmin");
const Admin = mongoose.model("Admin");

const adminSignUp = async (req, res) => {

  const { username, name, email, password } = req.body;

  if (!username || !name || !email || !password) {
    return res
      .status(422)
      .send({ error: "Must provide username, name, email and passoword" });
  }

  try {
    const userFind = await Admin.findOne({ email });

    if (userFind) {
      return res
        .status(200)
        .send({
          error:
            "Duplicate Email, please enter a diiferent email or signup using the email",
        });
    }

    const user = new Admin({ username, name, email, password });

    await user.save();

    // const token = jwt.sign(
    //   { userId: user._id, auth: "admin" },
    //   process.env.JWT_KEY,
    //   {
    //     expiresIn: "3d",
    //   }
    // );
    res.status(200).send({msg:"Signup Complete"});
  } catch (err) {
    return res.status(422).send(err.message);
  }
};

const adminSignIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  const user = await Admin.findOne({ email });
  if (!user) {
    return res.status(200).send({ error: "Invalid password or email" });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
      expiresIn: "3d",
    });
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "Invalid password or email" });
  }
};

module.exports = {
  adminSignUp,
  adminSignIn,
};
