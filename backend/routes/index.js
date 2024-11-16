const express = require("express");
const mongoose = require("mongoose");
const { Account } = require("../Databases/db");
const middleware = require("./middleware");

const router = express.Router();

router.get("/account/balance",middleware, async function(req, res) {
    const user_id = req.userId;
    const user = await Account.findOne({userId: user_id});

    if (!user) {
        return res.status(403).json({ message: "Invalid user" });
    }

    res.status(200).json({ Balance: user.balance });
});

router.post("/account/transfer",middleware, async function(req,res) {
    const session = await mongoose.startSession();

    session.startTransaction();

    const {amount, to} = req.body;
    console.log(req.userId)

    const account = await Account.findOne({userId: req.userId}).session(session);
    

    if (!account || account.balance <amount){
        console.log(account.balance)
        session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient Balance"
        })
    };

    const toAccount = Account.findOne({userId: to}).session(session);

    if(!toAccount){
        session.abortTransaction();
        return res.status(400).json({
            message: "Invalid Account"
        })
    }

    await Account.updateOne({userId: req.userId},{$inc: {balance: -amount}}).session(session);
    await Account.updateOne({userId: to},{$inc: {balance: amount}}).session(session);

    session.commitTransaction();
    res.json({
        message: "Transfer Successful"
    })
});

module.exports = router;
