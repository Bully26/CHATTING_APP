import mongoose from "mongoose";

const datSchema = new mongoose.Schema({
    user: String,
    message: String,
    recevier: String 
});

const chatroomSchema = new mongoose.Schema({
    chatroom_id: String,
    chat: [datSchema] 
});

export const Chat = mongoose.model('Chat', chatroomSchema);
export const Data = mongoose.model('Data', datSchema); 
