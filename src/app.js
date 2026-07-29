const express = require("express")
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.rotes");
const musicRouter = require("./routes/music.routes")

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth",authRoutes);
app.use("/api/music",musicRouter);




module.exports = app;