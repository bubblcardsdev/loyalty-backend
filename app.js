import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import compress from "compression";
// import swaggerUi from "swagger-ui-express";
// import { readFile } from "fs/promises";

// const swaggerFile = JSON.parse(
//   await readFile(new URL("./swagger-output.json", import.meta.url))
// );

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compress());
// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.set("trust proxy", 1);
app.use("/fonts", express.static("fonts"));

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

export default app;
