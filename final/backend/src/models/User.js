import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: String, // Number is shorthand for {type: Number}
    page: [{ type: mongoose.Types.ObjectId, ref: 'Page' }],
    favorite:[{ type: mongoose.Types.ObjectId, ref: 'Page' }]
});
const User = mongoose.model('User', UserSchema);
export default User;