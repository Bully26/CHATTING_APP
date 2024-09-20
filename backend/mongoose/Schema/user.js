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
const user_friend=new mongoose.Schema({
   user:String,
   friend:[String]
});

export const Chat = mongoose.model('Chat', chatroomSchema);
export const Data = mongoose.model('Data', datSchema); 
export const Userfriend=mongoose.model('Userfriend',user_friend);
