const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    batchId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Batch' },
    pic: { type: String, default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg' }
}, {
    timestamps: true
})

// here we are encrypting the password before storing in the db
userSchema.methods.matchPassword = async function (enteredPassword) {
    console.log(enteredPassword, "enterpassword");
    return await bcrypt.compare(enteredPassword, this.password)
}
userSchema.pre('save', async function (next) {
    if (!this.isModified) {
        next()
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt)
})


const User = mongoose.model('Users', userSchema);
module.exports = User;