const express = require("express");
const { User, Account } = require("../Databases/db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const middleware = require("./middleware");

const jwtPassword = "Purvanchal";
const router = express.Router();

const usernameSchema = zod.string();
const passwordSchema = zod.string().min(6);
const firstNameSchema = zod.string();
const lastNameSchema = zod.string();

router.post("/signup", async (req, res) => {
    const username = usernameSchema.safeParse(req.body.username);
    const firstName = firstNameSchema.safeParse(req.body.firstName);
    const lastName = lastNameSchema.safeParse(req.body.lastName);
    const password = passwordSchema.safeParse(req.body.password);

    if (!username.success || !password.success) {
        return res.status(400).json({ message: "Invalid input" });
    }

    const user = await User.create({
        username: username.data,
        firstName: firstName.data,
        lastName: lastName.data,
        password: password.data
    });

    const token = jwt.sign({ user_id: user._id }, jwtPassword);
    res.status(201).json({ message: "User registered successfully", token });
});

router.post("/signin", async (req, res) => {
    const username = usernameSchema.safeParse(req.body.username);
    const password = passwordSchema.safeParse(req.body.password);

    if (!username.success || !password.success) {
        return res.status(400).json({ message: "Invalid input" });
    }

    const user = await User.findOne({ username: username.data, password: password.data });
    if (!user) return res.status(400).send({ message: "Error while logging in." });

    const token = jwt.sign({ user_id: user._id }, jwtPassword);

    await Account.create({
        userId: user._id,
        balance: Math.random() * 10000
    });

    res.status(200).json({ token });
});

router.get('/bulk', async (req, res) => {
    console.log("GET /bulk route hit"); // Log to verify route is hit
    try {
        const users = await User.find({});
        console.log("Fetched users:", users); // Log fetched users
        res.status(200).send({ users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});


module.exports = router;
