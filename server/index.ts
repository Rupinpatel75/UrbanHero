import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User } from "./models/User";
import { Report } from "./models/Report";
import multer from 'multer';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
const JWT_SECRET = "123123";
const upload = multer({ dest: 'uploads/' });

mongoose
  .connect("mongodb://localhost:27017/Smartcity_01")
  .then(() => log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});


app.post("/signup", async (req: Request, res: Response) => {
  try {
    const { username, email, password, state, district, city, phone_no } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({ username, email, password, state, district, city, phone_no });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login Route
app.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(400).json({ message: "Invalid credentials" });
    // }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.json({token});
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.post("/api/cases", upload.single('image'), async (req, res) => {
  console.log(req.body); // This should now contain the form fields
  console.log(req.file); // This should contain the uploaded file info
  try {
    const {
      title,
      description,
      category,
      priority,
      location,
      latitude,
      longitude,
      userId,
    } = req.body;

    // Validate required fields
    if (!title || !description || !category || !latitude || !longitude || !userId) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    // Create a new report
    const newReport = new Report({
      title,
      description,
      category,
      priority,
      location,
      latitude,
      longitude,
      imageUrl: req.file ? req.file.path : '', // Save the file path if an image was uploaded
      userId,
    });

    // Save to database
    await newReport.save();

    res.status(201).json({ message: "Report submitted successfully", report: newReport });
  } catch (error) {
    console.error("Error submitting report:", error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
});


app.get("/api/cases", async (req, res) => {
  try {
    const cases = await Report.find(); // Fetch from MongoDB
    res.json(cases);
  } catch (error) {
    res.status(500).json({ error: "Error fetching cases" });
  }
});


(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client
  const PORT = 5000;
  server.listen(PORT, "0.0.0.0", () => {
    log(`serving on port ${PORT}`);
  });
})();
