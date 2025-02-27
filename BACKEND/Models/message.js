import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, trim: true },
    img: { type: String }, // Store image URL or file path
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;