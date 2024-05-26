const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const run = require("./db");
const itemRoutes = require("./routes/itemRoutes");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const { ObjectId, Int32 } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
run();

// Middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3001", // Update this to your client's origin
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Routes
// Define a Mongoose schema for the sample collection (optional)
const airbnbSchema = new mongoose.Schema(
  {
    _id: ObjectId,

    saleDate: Date,

    items: Array,

    storeLocation: String,

    customer: Object,

    gender: String,
    age: Number,
    email: String,
    satisfaction: Number,
    couponUsed: Boolean,
    purchaseMethod: String,
  },
  { strict: false }
);
const Airbnb = mongoose.model("sample_supplies.sales", airbnbSchema);

// Endpoint to fetch data from the sample_airbnb collection
app.get("/airbnb", async (req, res) => {
  try {
    const listings = await Airbnb.find().limit(10); // Limit to 10 documents
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
