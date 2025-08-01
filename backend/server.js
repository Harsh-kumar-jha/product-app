import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use("/api/v1/product", productRoutes);

app.get("/health", (req, res) => {
  try {
    res.send("Server is up and running...");
  } catch (err) {
    throw new Error("Something went wrong...");
  }
});
app.listen(PORT, (err) => {
  if (err) {
    console.log(`Failed to Start Backend Server: ${err}`);
  } else {
    connectDB();
    console.log(`Application started on the Port:${PORT}`);
  }
});
