const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./services/connect");
dotenv.config();
const app = express();
const url = process.env.MONG_URI;

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
    await connectDB(url);
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err.message);
  }
};

start();
