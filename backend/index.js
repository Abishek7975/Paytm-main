const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());


app.use(
    cors({
        origin: "http://localhost:5173", // Replace with your frontend's URL
        methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
        allowedHeaders: ["Content-Type"], // Allowed headers
    })
);

const mainRouter = require("./routes/index");
const userRouter = require("./routes/user");


app.use(express.json()); // Add this middleware to parse JSON bodies

app.use("/api/v1", mainRouter);
app.use("/api/v1/user", userRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


