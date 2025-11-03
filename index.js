import app from "./app.js";
import config from "./config/config.js";
import router from "./routes/index.route.js";
// import adminRouter from "./routes/adminRoutes/index.admin.route.js";

app.use("/api", router);
// app.use("/api/admin", adminRouter);

const PORT = config.port;

app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
