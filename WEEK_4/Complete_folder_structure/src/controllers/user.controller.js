import { emailQueue } from "../jobs/email.job.js";
import User from "../models/User.js"; 

export const createUser = async (req, res) => {
  const user = await User.create(req.body);

  await emailQueue.add("welcome-email", {
    to: user.email,
    subject: "Welcome to our platform",
  });

  res.status(201).json({ success: true, user });
};
