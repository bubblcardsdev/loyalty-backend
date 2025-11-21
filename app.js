import express from "express";
import cors from "cors";
import compression from "compression";
import swaggerUi from "swagger-ui-express";
import { readFile } from "fs/promises";

const app = express();

// Load Swagger Files asynchronously at startup
const swaggerUser = JSON.parse(
  await readFile(new URL("./swagger/user/index.json", import.meta.url))
);

const swaggerAdmin = JSON.parse(
  await readFile(new URL("./swagger/admin/index.json", import.meta.url))
);

// Middleware
app.use(cors());
app.use(express.json()); // replaces bodyParser.json()
app.use(express.urlencoded({ extended: true })); // replaces bodyParser.urlencoded()
app.use(compression());
app.set("trust proxy", 1);

// Serve static fonts
app.use("/fonts", express.static("fonts"));


// User docs
app.use(
  "/docs/user",
  swaggerUi.serveFiles(swaggerUser, {}),
  swaggerUi.setup(swaggerUser)
);

// Admin docs
app.use(
  "/docs/admin",
  swaggerUi.serveFiles(swaggerAdmin, {}),
  swaggerUi.setup(swaggerAdmin)
);
/**
 * OPTIONAL: Restaurant Code Validation Middleware
 * Uncomment if you want to apply it globally.
 */
// app.use((req, res, next) => {
//   const restaurantCode = req.headers["x-restaurant-code"];
//   if (!restaurantCode) {
//     return res.status(400).json({
//       success: false,
//       message: "Restaurant code is required",
//     });
//   }
//   req.restaurantCode = restaurantCode;
//   next();
// });

// Health check (optional)
app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

export default app;
