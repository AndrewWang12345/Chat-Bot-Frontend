const Chat = require("../model/chatModel");
module.exports.newChat = async (req, res, next) => {
    try{
        const chat_user=req.body.user_id;
        //console.log(chat_user.user_id);
        const user = await Chat.create({
            user:chat_user,
        });
        return res.json({status: true, user});
    } catch (ex){
        next(ex);
    }
};
module.exports.getAllChats = async (req, res, next) => {
    try{
        console.log("here");
        const chats = await Chat.find({user: {$eq: req.params.id}}).select([
            "user",
            "_id",
        ]);
        return res.json(chats);
    } catch (ex){
        next(ex);
    }
}