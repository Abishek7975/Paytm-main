const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://abhishekmongo:AbishekMongo@cluster0.y4xm7.mongodb.net/")

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 20}
})
const User = mongoose.model("User",UserSchema);

const AccountSchema= new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    balance: Number
});

const Account = mongoose.model("Account",AccountSchema)



module.exports = {
    User, Account
}