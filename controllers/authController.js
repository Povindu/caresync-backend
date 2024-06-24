const mongoose = require("mongoose");
require("../models/Patient");

const Patient = mongoose.model("Patient");
const Doctor = mongoose.model("Doctor");

const nodemailer = require("nodemailer");

const {
  generateRefreshToken,
} = require("../utils/TokenGenarate/generateRefreshToken");

const {
  generateAccessToken,
} = require("../utils/TokenGenarate/generateAccessToken");

const {
  refreshAccessToken,
} = require("../utils/TokenGenarate/refreshAccessGenerate");

const userSignUp = async (req, res) => {
  console.log("Patient Signup req.body : ", req.body);

  const { firstName, lastName, nic, email, password } = req.body;

  const existingUser = await Patient.findOne({ email });

  if (existingUser) {
    console.log("Email is in use");
    return res.status(400).json({
      error:
        "Email is in use. Please use a different email or login using the email",
    });
  }

  try {
    const user = new Patient({ firstName, lastName, nic, email, password });
    await user.save();
    console.log("Patient Signup Success");
    res.status(200).send();
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};

const userSignIn = async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "Must provide email and password" });
  }

  const user = await Patient.findOne({ email });

  if (!user) {
    return res.status(400).send({ error: "Invalid email" });
  }

  if (user.patientVerification == false) {
    return res.status(400).send({ error: "User not verified" });
  }

  try {
    await user.comparePassword(password);
  } catch (err) {
    return res.status(400).send({ error: "Invalid password or email" });
  }

  try {
    console.log(user._id, user.role, user.firstName, user.lastName);
    const accessToken = await generateAccessToken({
      _id: user._id,
      roles: user.role,
      fName: user.firstName,
      lName: user.lastName,
    });
    const refreshToken = await generateRefreshToken({
      _id: user._id,
      roles: user.role,
      fName: user.firstName,
      lName: user.lastName,
    });

    res.status(200).send({ accessToken, refreshToken });
  } catch (err) {
    return res.status(400).send({ error: "Server Error" });
  }
};

const doctorSignUp = async (req, res) => {
  const {
    firstName,
    lastName,
    nic,
    email,
    password,
    medicalId,
    medicalIdVerify,
  } = req.body;

  const existingDoctor = await Doctor.findOne({ email });
  if (existingDoctor) {
    console.log("Email is in use");
    return res.status(400).send({
      error:
        "Email is in use. Please use a diiferent email or login with the email",
    });
  }

  try {
    const doctor = new Doctor({
      firstName,
      lastName,
      nic,
      email,
      password,
      medicalId,
      medicalIdVerify,
    });
    await doctor.save();

    res.status(200).send("Success");
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};

const doctorSignIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "Must provide email and password" });
  }

  const doctor = await Doctor.findOne({ email });

  if (!doctor) {
    return res.status(400).send({ error: "Invalid email" });
  }
  const medicalId = doctor.medicalIdVerify;
  try {
    await doctor.comparePassword(password);
    console.log("password okay");
  } catch (err) {
    return res.status(400).send({ error: "Invalid password or email" });
  }

  try {
    console.log(doctor._id, doctor.role, doctor.firstName, doctor.lastName);

    if (medicalId == false) {
      return res.status(400).send({ error: "Medical Id not verified" });
    }

    const accessToken = await generateAccessToken({
      _id: doctor._id,
      roles: doctor.role,
      fName: doctor.firstName,
      lName: doctor.lastName,
    });
    const refreshToken = await generateRefreshToken({
      _id: doctor._id,
      roles: doctor.role,
      fName: doctor.firstName,
      lName: doctor.lastName,
    });
    res.status(200).send({ accessToken, refreshToken, medicalId });
  } catch (err) {
    return res.status(400).send({ error: "Server Error" });
  }
};

const refreshAT = async (req, res) => {

  const { refreshToken } = req.body;
  console.log(refreshToken);

  if (!refreshToken) {
    return res.status(400).send({ error: "Must provide refresh token" });
  }

  refreshAccessToken(refreshToken)
    .then((result) => {
      if (result) {
        res.status(200).send({ token : result.accessToken});
      } else {
        throw error;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ error: "Invalid refresh token" });
    });
};

//handle forgot passowrd
const forgotPassword = async (req, res) => {
  try {
    const { email, userType } = req.body;

    console.log("email:", email);
    console.log("userType:", userType);

    // Check if email exists in the patient or doctor database
    const user =
      userType === "patient"
        ? await Patient.findOne({ email })
        : userType === "doctor"
        ? await Doctor.findOne({ email })
        : null;
    console.log("user:", user);

    if (user === null) {
      console.log("User does not exist");
      return res.status(400).json({ error: "User does not exist" });
    }

    // Generate a random OTP
    const OTP = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

    // Save the OTP to the user's document in the database and set an expiry time
    user.resetPasswordOTP = OTP;
    user.resetPasswordOTPExpires = Date.now() + 600000; // 10 minutes
    await user.save();

    // Send the OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "manushadananjaya999@gmail.com",
        pass: "tums mfyz lncy tmhk",
      },
    });

    console.log("email:", user.email);

    const mailOptions = {
      from: "manushadananjaya999@gmail.com",
      to: user.email,
      subject: "Password Reset OTP",
      html: `
        <p>Hello,</p>
        <p>You are receiving this email because you (or someone else) requested to reset the password for your account.</p>
        <p>Your OTP for password reset is: <strong>${OTP}</strong></p>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        <p>Thank you.</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Error sending email" });
      }
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "Email sent" });
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//handle verify OTP
const verifyOTP = async (req, res) => {
  try {
    console.log(req.body);
    const { email, otp, userType } = req.body;

    // Check if email exists in the patient or doctor database
    const user =
      userType === "patient"
        ? await Patient.findOne({ email })
        : userType === "doctor"
        ? await Doctor.findOne({ email })
        : null;

    if (user === null) {
      console.log("User does not exist");
      return res.status(400).json({ error: "User does not exist" });
    }

    // Check if the OTP is correct
    if (user.resetPasswordOTP !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    //check if the OTP is expired
    if (user.resetPasswordOTPExpires < Date.now()) {
      return res.status(400).json({ error: "OTP expired" });
    }

    // Reset the OTP in the user's document
    user.resetPasswordOTP = undefined;

    //check if user is verified

    await user.save();

    res.status(200).json({ message: "OTP verified" });
  } catch (error) {
    console.error("Error in verifyOTP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//handle verify OTP in patient registration
const verifyOtpPatient = async (req, res) => {
  try {
    console.log(req.body);
    const { email, otp } = req.body;

    // Check if email exists in the patient or doctor database
    const user = await Patient.findOne({ email });

    if (user === null) {
      console.log("User does not exist");
      return res.status(400).json({ error: "User does not exist" });
    }

    // Check if the OTP is correct

    if (user.emailVerificationOTP !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    //check if the OTP is expired
    if (user.emailVerificationExpires < Date.now()) {
      return res.status(400).json({ error: "OTP expired" });
    }

    // Reset the OTP in the user's document
    user.emailVerificationOTP = undefined;

    //set the user as verified
    user.patientVerification = true;

    await user.save();

    res.status(200).json({ message: "OTP verified" });
  } catch (error) {
    console.error("Error in verifyOTP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//handle reset password
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, userType } = req.body;
    console.log(req.body);

    // Check if email exists in the patient or doctor database
    const user =
      userType === "patient"
        ? await Patient.findOne({ email })
        : userType === "doctor"
        ? await Doctor.findOne({ email })
        : null;

    if (user === null) {
      console.log("User does not exist");
      return res.status(400).json({ error: "User does not exist" });
    }

    // Reset the password in the user's document

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const resendOTP = async (req, res) => {
  try {
    const { email, userType } = req.body;

    // Check if email exists in the patient or doctor database
    const user =
      userType === "patient"
        ? await Patient.findOne({ email })
        : userType === "doctor"
        ? await Doctor.findOne({ email })
        : null;

    if (user === null) {
      console.log("User does not exist");
      return res.status(400).json({ error: "User does not exist" });
    }

    // Generate a new OTP
    const OTP = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

    // Save the OTP to the user's document in the database and set an expiry time
    user.resetPasswordOTP = OTP;
    user.resetPasswordOTPExpires = Date.now() + 600000; // 10 minutes
    await user.save();

    // Send the OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "manushadananjaya999@gmail.com",
        pass: "tums mfyz lncy tmhk",
      },
    });

    const mailOptions = {
      from: "manushadananjaya999@gmail.com",
      to: user.email,
      subject: "Password Reset OTP",
      html: `
        <p>Hello,</p>
        <p>You are receiving this email because you (or someone else) requested to reset the password for your account.</p>
        <p>Your OTP for password reset is: <strong>${OTP}</strong></p>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        <p>Thank you.</p>
      `,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Error sending email" });
      }
      console.log("Email sent: " + info.response);
      //new otp send success message to user
      res.status(200).json({ message: "OTP sent Successful" });
    });
  } catch (error) {
    console.error("Error in resendOTP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOTP = async (req, res) => {
  try {
    const { email } = req.body;

    console.log("email from GetOtp:", email);

    user = await Patient.findOne({ email });

    console.log("user from GetOtp:", user);

    // Generate a new OTP
    const OTP = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

    // Save the OTP to the user's document in the database and set an expiry time
    user.emailVerificationOTP = OTP;
    user.emailVerificationExpires = Date.now() + 600000; // 10 minutes
    await user.save();

    // Send the OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "manushadananjaya999@gmail.com",
        pass: "tums mfyz lncy tmhk",
      },
    });

    const mailOptions = {
      from: "manushadananjaya999@gmail.com",
      to: user.email,
      subject: "Registration OTP",
      html: `
        <p>Hello,</p>
        <p>Welcome to the CareSync.</p>
        <p>Your OTP for registration is: <strong>${OTP}</strong></p>
        <p>If you did not request this, please ignore this email and your registration will remain unchanged.</p>
        <p>Thank you.</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Error sending email" });
      }
      console.log("Email sent: " + info.response);
      //new otp send success message to user
      res.status(200).json({ message: "New OTP sent" });
    });
  } catch (error) {
    console.error("Error in resendOTP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//change password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, userType, id } = req.body;

    // Check user from user id
    const user =
      userType === "patient"
        ? await Patient.findById(id)
        : userType === "doctor"
        ? await Doctor.findById(id)
        : null;

    if (user === null) {
      console.log("User does not exist");
      return res.status(400).json({ error: "User does not exist" });
    }

    // Check if the current password is correct
    try {
      await user.comparePassword(currentPassword);
    } catch (err) {
      return res.status(400).send({ error: "Current password is invalid" });
    }

    // Reset the password in the user's document
    user.password = newPassword;

    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error in changePassword:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Check if an email exists in the database
const checkEmailExists = async (req, res) => {
  const { email } = req.params;
  try {
    const patient = await Patient.findOne({ email });
    // res.json({ exists: !!patient });
    res.json({ emailExists: "false" });
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Check if an email exists in the database doctors
const checkEmailExistsDoctors = async (req, res) => {
  const { email } = req.params;
  try {
    const doctor = await Doctor.findOne({ email });
    res.json({ emailExists: "false" });
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  userSignUp,
  userSignIn,
  doctorSignUp,
  doctorSignIn,
  refreshAT,
  forgotPassword,
  verifyOTP,
  resetPassword,
  resendOTP,
  changePassword,
  getOTP,
  verifyOtpPatient,
  checkEmailExists,
  checkEmailExistsDoctors,
};
