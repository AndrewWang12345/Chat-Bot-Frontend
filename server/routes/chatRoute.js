const {newChat, getAllChats} = require("../controllers/chatController");
const router = require("express").Router();
router.post("/newChat", newChat);
router.get("/allChats/:id", getAllChats);
module.exports = router;