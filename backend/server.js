const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./services/connect");
const multer = require("multer");
const path = require("path");
const Issue = require('./models/Issue');
dotenv.config();
const app = express();

const mongoUri = process.env.MONG_URI;

if (!mongoUri) {
  console.error("❌ MongoDB URI is not defined. Check your .env file.");
  process.exit(1);
}
var admin = require("firebase-admin");

var serviceAccount = require("./spithack-dab01-firebase-adminsdk-fbsvc-ebd65a8127.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const port = 5001;
// Middleware
app.use(cors());
app.use(express.json());
const login = require("./routes/login");
app.use("/login", login);

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "🚀 Express Server is Running!" });
});

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route to handle form submission
app.post("/api/report-issue", upload.single('image'), async (req, res) => {
  try {
    console.log("Request received");
    console.log("Body:", req.body); // Log form fields (description, location)
    console.log("File:", req.file); // Log file data

    // Ensure required data is received
    if (!req.body.description || !req.body.location || !req.file) {
      return res.status(400).json({ error: "Please provide all required details (description, location, image)" });
    }

    // Process the received data
    const { description, location } = req.body;
    const { path: imagePath } = req.file; // File path for the uploaded image

    // Create a new issue object
    const newIssue = new Issue({
      description,
      location: JSON.parse(location), // Parse location to convert it into a valid object
      imageUrl: imagePath, // You can store the image path or URL here
    });

    // Save the issue to the database
    await newIssue.save();

    // Send a success response
    res.status(200).json({ message: "Issue reported successfully" });
  } catch (error) {
    console.error("Error handling the report:", error.message);
    res.status(500).json({ error: "There was an issue reporting the problem" });
  }
});
app.post("/send-sos", async (req, res) => {
  const { title, message } = req.body;

  const messagePayload = {
    notification: {
      title: title || "🚨 Emergency Alert!",
      body: message || "Someone nearby triggered an SOS!",
    },
    topic: "sos-alerts",
  };

  try {
    await admin.messaging().send(messagePayload);
    res.json({ success: true, message: "SOS Alert Sent!" });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const start = async () => {
  try {
    await connectDB(mongoUri);
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err.message);
  }
};

start();
