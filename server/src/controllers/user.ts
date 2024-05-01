import { RequestHandler } from "express";
import nodemailer from "nodemailer";

import { CreateUser } from "#/@types/user"; // Ensure correct path
import User from "#/models/user"; // Ensure correct path
import { MAILTRAP_PASS, MAILTRAP_USER } from "#/utils/variables"; // Ensure correct path

export const create: RequestHandler = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Attempt to create a user
    const user = await User.create({ name, email, password });

    // Send verification email
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: MAILTRAP_USER,
        pass: MAILTRAP_PASS,
      },
    });

    const mailOptions = {
      to: email, // Send to the email from request
      from: "auth@myapp.com", // Your sender address
      subject: "Verify Your Email", // Subject line
      html: "<h1>Welcome to MyApp! Please verify your email.</h1>", // HTML body
    };

    // Sending the email
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: "Failed to send verification email." });
      }
      console.log('Verification email sent:', info.response);
      res.status(201).json({ user, message: "Verification email sent successfully!" });
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: "Failed to create user." });
  }
};
