import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Setup
app.use(express.json());
app.use(cors());

// In-memory users for this demo. Restarting the backend clears newly registered users.
const users = [
  {
  email: "selva@gmail.com",
  password: "1234"
  }
];

// 1. Health Check Endpoint
app.get("/", (req, res) => {
  res.status(200).json({ message: "Netflix Clone Backend is running smoothly!" });
});

// 2. Login Endpoint
app.post(["/login", "/api/login"], (req, res) => {
  const { email, password } = req.body;

  // Frontend Validation Check on Server
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required!" });
  }

  // Authentication Logic
  const user = users.find((candidate) => candidate.email === email.trim().toLowerCase()
    && candidate.password === password);

  if (user) {
    return res.status(200).json({ 
      message: "Login successful!",
      user: { email: user.email }
    });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

// 3. Registration Endpoint
app.post(["/register", "/api/register"], (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields!" });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = users.some((user) => user.email === normalizedEmail);

  if (existingUser) {
    return res.status(409).json({ message: "An account with this email already exists." });
  }

  users.push({ email: normalizedEmail, password });
  return res.status(201).json({ message: "Registration successful! Please login." });
});

// Server Listening
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});