
import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ChatBoxSchema = new Schema({
    name1: {
        type: String,
        required:
            [true, 'Name field is required.']
    },
    name2:{
        type: String,
        required:
            [true, 'Name field is required.']
    },
    messages: [{
        sender: { type: String },
        body: { type: String },
    }],
});
const ChatBoxModel =
    mongoose.model('ChatBox',
        ChatBoxSchema);
export { ChatBoxModel }
// export {ChatBoxModel, MessageModel, UserModel}